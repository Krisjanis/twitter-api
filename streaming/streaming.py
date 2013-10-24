# -*- coding: utf-8 -*-

import codecs
import string
import pprint
import time
import pycurl
import urllib
import json
import oauth2 as oauth
import os

SERVER_DATA_ROOT = 'data/'
API_ENDPOINT_URL = 'https://stream.twitter.com/1.1/statuses/filter.json'
USER_AGENT = 'LatviesiTvito 1.0' # This can be anything really

# You need to replace these with your own values
OAUTH_KEYS = {'consumer_key': 'vknyFajJqz5YUIwvwX6mg',
    'consumer_secret': '5ZyVTz8Z32baUnMUVXKp8riUEe04BBchr1uwAfOzvG0',
    'access_token_key': '1930450538-5EmqMGaJIIbnbz3mmqicVwCOoRVZoNq9hQoeSMx',
    'access_token_secret': 'w5D4BNMnJPixwfySUoOMeJU8pw8MrVUJSdAV9kB0'}

# These values are posted when setting up the connection
POST_PARAMS = {'include_entities': 0,
    'stall_warning': 'true',
    'language': 'lv',
    'track': 'latvija, latvieši, rīga, ministrija, depudāts, iestāde, kļūda, korumpēts, labrīt, nakts, rīts, diena, pusdienas, ēst, universitāte, mācās, mācos, biju, braukšu, twitterspēks, pulkstenis, miegs, gulēt, filma, mīlu, lv, ā, š, ē, ū, ģ, ļ, ņ, ž'}

class TwitterStream:
    def __init__(self):
        self.oauth_token = oauth.Token(key=OAUTH_KEYS['access_token_key'], secret=OAUTH_KEYS['access_token_secret'])
        self.oauth_consumer = oauth.Consumer(key=OAUTH_KEYS['consumer_key'], secret=OAUTH_KEYS['consumer_secret'])
        self.conn = None
        self.buffer = ''
        self.setup_connection()
    
    def setup_connection(self):
        """ Create persistant HTTP connection to Streaming API endpoint using cURL.
            """
        if self.conn:
            self.conn.close()
            self.buffer = ''
        self.conn = pycurl.Curl()
        self.conn.setopt(pycurl.URL, API_ENDPOINT_URL)
        self.conn.setopt(pycurl.USERAGENT, USER_AGENT)
        # Using gzip is optional but saves us bandwidth.
        self.conn.setopt(pycurl.ENCODING, 'deflate, gzip')
        self.conn.setopt(pycurl.POST, 1)
        self.conn.setopt(pycurl.POSTFIELDS, urllib.urlencode(POST_PARAMS))
        self.conn.setopt(pycurl.HTTPHEADER, ['Host: stream.twitter.com',
                                             'Authorization: %s' % self.get_oauth_header()])
        # self.handle_tweet is the method that are called when new tweets arrive
        self.conn.setopt(pycurl.WRITEFUNCTION, self.handle_tweet)
    
    def get_oauth_header(self):
        """ Create and return OAuth header.
            """
        params = {'oauth_version': '1.0',
            'oauth_nonce': oauth.generate_nonce(),
            'oauth_timestamp': int(time.time())}
        req = oauth.Request(method='POST', parameters=params, url='%s?%s' % (API_ENDPOINT_URL,
                                                                             urllib.urlencode(POST_PARAMS)))
        req.sign_request(oauth.SignatureMethod_HMAC_SHA1(), self.oauth_consumer, self.oauth_token)
        return req.to_header()['Authorization'].encode('utf-8')
    
    def start(self):
        """ Start listbļaening to Streaming endpoint. Handle exceptions according to Twitter's recommendations.
            """
        backoff_network_error = 0.25
        backoff_http_error = 5
        backoff_rate_limit = 60
        while True:
            self.setup_connection()
            try:
                self.conn.perform()
            except:
                # Network error, use linear back off up to 16 seconds
                print 'Network error: %s' % self.conn.errstr()
                print 'Waiting %s seconds before trying again' % backoff_network_error
                time.sleep(backoff_network_error)
                backoff_network_error = min(backoff_network_error + 1, 16)
                continue
            # HTTP Error
            sc = self.conn.getinfo(pycurl.HTTP_CODE)
            if sc == 420:
                # Rate limit, use exponential back off starting with 1 minute and double each attempt
                print 'Rate limit, waiting %s seconds' % backoff_rate_limit
                time.sleep(backoff_rate_limit)
                backoff_rate_limit *= 2
            else:
                # HTTP error, use exponential back off up to 320 seconds
                print 'HTTP error %s, %s' % (sc, self.conn.errstr())
                print 'Waiting %s seconds' % backoff_http_error
                time.sleep(backoff_http_error)
                backoff_http_error = min(backoff_http_error * 2, 320)
    
    def handle_tweet(self, data):
        """ This method is called when data is received through Streaming endpoint.
            """
        self.buffer += data
        if data.endswith('\r\n') and self.buffer.strip():
            # complete message received
            message = json.loads(self.buffer)
            self.buffer = ''
            msg = ''
            if message.get('limit'):
                print 'Rate limiting caused us to miss %s tweets' % (message['limit'].get('track'))
            elif message.get('disconnect'):
                raise Exception('Got disconnect: %s' % message['disconnect'].get('reason'))
            elif message.get('warning'):
                print 'Got warning: %s' % message['warning'].get('message')
            else:
                print ' Tweet: %s' % message.get('text')

                # create directory and files for saving
                explode = message.get('created_at').split(' ')
                year = explode[5]
                month = explode[1]
                day = explode[2]

                if not os.path.exists(SERVER_DATA_ROOT + year):
                    os.makedirs(SERVER_DATA_ROOT + year)
                if not os.path.exists(SERVER_DATA_ROOT + year + '/' + month):
                    os.makedirs(SERVER_DATA_ROOT + year + '/' + month)
                file = codecs.open(SERVER_DATA_ROOT + year + '/' + month + '/' + day + '.csv', 'a', 'utf-8')

                # write header if file empty
                if os.stat(SERVER_DATA_ROOT + year + '/' + month + '/' + day + '.csv').st_size == 0:
                    file.write('contributors,coordinates,created_at,entities,favorite_count,favorited,filter_level,geo,id_str,in_reply_to_screen_name,in_reply_to_status_id_str,in_reply_to_user_id_str,lang,place,possibly_sensitive,retweet_count,retweeted,retweeted_status,source,text,truncated,user\n')

                # save data
                file.write('"' + json.dumps(message.get('contributors'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',"' + json.dumps(message.get('coordinates'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + message.get('created_at'))
                file.write(',"' + json.dumps(message.get('entities'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + str(message.get('favorite_count')))
                file.write(',' + str(message.get('favorited')))
                file.write(',' + message.get('filter_level'))
                file.write(',"' + json.dumps(message.get('geo'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + message.get('id_str'))
                file.write(',' + str(message.get('in_reply_to_screen_name')))
                file.write(',' + str(message.get('in_reply_to_status_id_str')))
                file.write(',' + str(message.get('in_reply_to_user_id_str')))
                file.write(',' + message.get('lang'))
                file.write(',' + str(message.get('place')))
                file.write(',') # possibly_sensitive
                file.write(',' + str(message.get('retweet_count')))
                file.write(',' + str(message.get('retweeted')))
                file.write(',"' + json.dumps(message.get('retweeted_status'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + message.get('source'))
                file.write(',"' + message.get('text').replace('"', '""') + '"')
                file.write(',' + str(message.get('truncated')))
                file.write(',"' + json.dumps(message.get('user'), ensure_ascii=False).replace('"', '""') + '"')
                file.write('\n')
                file.close()

if __name__ == '__main__':
    ts = TwitterStream()
    ts.setup_connection()
    ts.start()