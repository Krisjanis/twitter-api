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

SERVER_DATA_ROOT = '/var/www/streaming/data/'
API_ENDPOINT_URL = 'https://stream.twitter.com/1.1/statuses/filter.json'
USER_AGENT = 'LatviesiTvito 1.0'

OAUTH_KEYS = {'consumer_key': 'vknyFajJqz5YUIwvwX6mg',
    'consumer_secret': '5ZyVTz8Z32baUnMUVXKp8riUEe04BBchr1uwAfOzvG0',
    'access_token_key': '1930450538-5EmqMGaJIIbnbz3mmqicVwCOoRVZoNq9hQoeSMx',
    'access_token_secret': 'w5D4BNMnJPixwfySUoOMeJU8pw8MrVUJSdAV9kB0'}

# These values are posted when setting up the connection
POST_PARAMS = {'include_entities': 0,
    'stall_warning': 'true',
    'language': 'lv',
    'track': 'jā, nē, būs, kā, arī, tomēr, laigan, mēs, jūs, viņš, viņa, viņi, šis, šī, šo, labs, labi, slikts, slikti, vakar, šodien, rīt, parīt, nākamnedēļ, pirmdiena, pirmdien, pirmdienā, otrdiena, otrdien, otrdienā, trešdiena, trešdien, trešdienā, ceturtdiena, ceturtdien, ceturdienā, piektdiena, piektdien, piektdienā, sestdiena, sestdien, sestdienā, svētdiena, svētdien, svētdienā, latvija, latvieši, jāņi, jāņos, rīga, labrīt, nakts, rīts, diena, pusdienas, vakariņas, brokastis, ēst, mācās, mācos, twitterspēks, pulkstenis, miegs, gulēt, filma, mīlu, iela, ielā, ielu, piemēram, piemērs, atzīme, ziņas, vasara, vasaru, vasarā, rudens, rudeni, rudenī, ziema, ziemu, ziemā, pavasaris, pavasarī, pavasari, šņabis, šnabi, treniņš, terniņā, treniņu, kurss, kursos, kursiem, lekcija, lekcijā, lekciju, mamma, tētis, sencis, muča, muteri, māsa, māsu, brālis, brāli'}

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
            # Complete message received
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
                # Create directory and files for saving
                explode = message.get('created_at').split(' ')
                year = explode[5]
                month = explode[1]
                day = explode[2]

                if not os.path.exists(SERVER_DATA_ROOT + year):
                    os.makedirs(SERVER_DATA_ROOT + year)
                if not os.path.exists(SERVER_DATA_ROOT + year + '/' + month):
                    os.makedirs(SERVER_DATA_ROOT + year + '/' + month)
                file = codecs.open(SERVER_DATA_ROOT + year + '/' + month + '/' + day + '.csv', 'a', encoding='utf-8')

                # Write header if file empty
                if os.stat(SERVER_DATA_ROOT + year + '/' + month + '/' + day + '.csv').st_size == 0:
                    file.write('contributors,coordinates,created_at,entities_symbols,entities_user_mentions,entities_hashtags,entities_urls,favorite_count,favorited,filter_level,geo,id_str,in_reply_to_screen_name,in_reply_to_status_id_str,in_reply_to_user_id_str,lang,place,retweet_count,retweeted,retweeted_status,source,text,truncated,user_follow_request_sent,user_profile_use_background_image,user_default_profile_image,user_id,user_verified,user_profile_image_url_https,user_profile_sidebar_fill_color,user_profile_text_color,user_followers_count,user_profile_sidebar_border_color,user_profile_background_color,user_listed_count,user_profile_background_image_url_https,user_utc_offset,user_statuses_count,user_description,user_friends_count,user_location,user_profile_link_color,user_profile_image_url,user_following,user_geo_enabled,user_profile_banner_url,user_profile_background_image_url,user_name,user_lang,user_profile_background_tile,user_favourites_count,user_screen_name,user_notifications,user_url,user_created_at,user_contributors_enabled,user_time_zone,user_protected,user_default_profile,user_is_translator\n')

                # Save data
                file.write('"' + json.dumps(message.get('contributors'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',"' + json.dumps(message.get('coordinates'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + message.get('created_at'))
                if message.get('entities').get('symbols') == []:
                    file.write(',None')
                else:
                    file.write(',"' + json.dumps(message.get('entities').get('symbols'), ensure_ascii=False).replace('"', '""') + '"')
                if message.get('entities').get('user_mentions') == []:
                    file.write(',None')
                else:
                    file.write(',"' + json.dumps(message.get('entities').get('user_mentions'), ensure_ascii=False).replace('"', '""') + '"')
                if message.get('entities').get('hashtags') == []:
                    file.write(',None')
                else:
                    file.write(',"' + json.dumps(message.get('entities').get('hashtags'), ensure_ascii=False).replace('"', '""') + '"')
                if message.get('entities').get('urls') == []:
                    file.write(',None')
                else:
                    file.write(',"' + json.dumps(message.get('entities').get('urls'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + str(message.get('favorite_count')))
                file.write(',' + str(message.get('favorited')))
                file.write(',' + message.get('filter_level'))
                file.write(',"' + json.dumps(message.get('geo'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + message.get('id_str'))
                file.write(',' + str(message.get('in_reply_to_screen_name')))
                file.write(',' + str(message.get('in_reply_to_status_id_str')))
                file.write(',' + str(message.get('in_reply_to_user_id_str')))
                file.write(',' + message.get('lang'))
                file.write(',"' + json.dumps(message.get('place'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + str(message.get('retweet_count')))
                file.write(',' + str(message.get('retweeted')))
                file.write(',"' + json.dumps(message.get('retweeted_status'), ensure_ascii=False).replace('"', '""') + '"')
                file.write(',' + message.get('source'))
                file.write(',"' + message.get('text').replace('"', '""') + '"')
                file.write(',' + str(message.get('truncated')))
                file.write(',' + str(message.get('user').get('follow_request_sent')))
                file.write(',' + str(message.get('user').get('profile_use_background_image')))
                file.write(',' + str(message.get('user').get('default_profile_image')))
                file.write(',' + str(message.get('user').get('id')))
                file.write(',' + str(message.get('user').get('verified')))
                file.write(',' + str(message.get('user').get('profile_image_url_https')))
                file.write(',' + str(message.get('user').get('profile_sidebar_fill_color')))
                file.write(',' + str(message.get('user').get('profile_text_color')))
                file.write(',' + str(message.get('user').get('followers_count')))
                file.write(',' + str(message.get('user').get('profile_sidebar_border_color')))
                file.write(',' + str(message.get('user').get('profile_background_color')))
                file.write(',' + str(message.get('user').get('listed_count')))
                file.write(',' + str(message.get('user').get('profile_background_image_url_https')))
                file.write(',' + str(message.get('user').get('utc_offset')))
                file.write(',' + str(message.get('user').get('statuses_count')))
                file.write(',' + json.dumps(message.get('user').get('description'), ensure_ascii=False))
                file.write(',' + str(message.get('user').get('friends_count')))
                file.write(',' + json.dumps(message.get('user').get('location'), ensure_ascii=False))
                file.write(',' + str(message.get('user').get('profile_link_color')))
                file.write(',' + str(message.get('user').get('profile_image_url')))
                file.write(',' + str(message.get('user').get('following')))
                file.write(',' + str(message.get('user').get('geo_enabled')))
                file.write(',' + str(message.get('user').get('profile_banner_url')))
                file.write(',' + str(message.get('user').get('profile_background_image_url')))
                file.write(',' + json.dumps(message.get('user').get('name'), ensure_ascii=False))
                file.write(',' + str(message.get('user').get('lang')))
                file.write(',' + str(message.get('user').get('profile_background_tile')))
                file.write(',' + str(message.get('user').get('favourites_count')))
                file.write(',' + json.dumps(message.get('user').get('screen_name'), ensure_ascii=False))
                file.write(',' + str(message.get('user').get('notifications')))
                file.write(',' + str(message.get('user').get('url')))
                file.write(',' + str(message.get('user').get('created_at')))
                file.write(',' + str(message.get('user').get('contributors_enabled')))
                file.write(',' + str(message.get('user').get('time_zone')))
                file.write(',' + str(message.get('user').get('protected')))
                file.write(',' + str(message.get('user').get('default_profile')))
                file.write(',' + str(message.get('user').get('is_translator')))
                file.write('\n')
                file.close()

if __name__ == '__main__':
    ts = TwitterStream()
    ts.setup_connection()
    ts.start()