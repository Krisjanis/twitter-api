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
import MySQLdb
import csv
import datetime
import calendar
from pytz import timezone
import pymongo
from pymongo import MongoClient

# Import config variables
config =  os.path.abspath(os.path.dirname(__file__)) + '/config.py'
import config

SERVER_DATA_ROOT = config.SERVER_DATA_ROOT

# Twitter streaming api data
API_ENDPOINT_URL = config.API_ENDPOINT_URL
USER_AGENT = config.USER_AGENT
OAUTH_KEYS = config.OAUTH_KEYS

# Database credentials
DB_HOST = config.DB_HOST
DB_PORT = config.DB_PORT
DB_USER = config.DB_USER
DB_PASSWORD = config.DB_PASSWORD
DB_TABLE = config.DB_TABLE

# These values are posted when setting up the connection
POST_PARAMS = {'include_entities': 0,
    'stall_warning': 'true',
    'language': 'lv',
    'track': 'šodien, diena, tikai, tagad, viņa, viņš, labrīt, mājās, laikam, ļoti, miegs, atkal, mamma, kāds, tomēr, būtu, līdz, beidzot, paldies, skolu, dienu, viņi, filma, nakts, gribu, tikko, vakarā, varbūt, patīk, vairāk, varētu, jāiet, dienas, viņu, kādu, tāds, vismaz, rīts, vispār, drīz, jūtos, vienmēr, tāda, laiks, skolā, vienkārši, rīga, rīta, darīt, labāk, kāpēc, mīlu, tieši, cilvēki, tiešām, mūsu, kurš, kāda, brokastis, laikā, domāju, nebūs, šovakar, latvija, izskatās, nekā, tāpēc, kopā, forši, tāpat, stundas, cilvēks, protams, iešu, treniņš, cerams, latvijas, sajūta, tādu, rudens, reizi, darbu, reizi, atpakaļ, viņam, mājas, būšu, gribas, stjuarts, taču, nenāk, garīgais, galīgi, rīgu, pēdējā, skolas, rīgas, vakariņas, gandrīz, iespējams, lūdzu, piektdien, tētis, negribu, ātri, cilvēku, nakti, treniņu, viņai, pirmā, kādam, braucu, normāli, mazliet, māsa, rīgā, pusdienas, dienā, viņas, pārāk, mājām, piektdiena, latvijā, domā, kamēr, vakara, ātrāk, pilnīgi, jautri, spēle, nesaprotu, braukt, manā, šķiet, nedēļas, vietā, nebūtu, sestdien, draugi, skatīties, brālis, cilvēkiem, dzīve, klāt, pirmdiena, sapratu, viņiem, jābūt, jāsāk, nopietni, interesanti, ziņas, brauc, bildes, nedēļa, sēžu, tādi, redzēt, slikts, reāli, dzimšanas, šeit, īpaši, gadu, pāris, grūti, vakaru, vētra, arlabunakti, tajā, negribas, iespēja, vēlāk, meitenes, jābrauc, tādas, stundu, nepatīk, jūtu, ielā, brīvdienas, īsti, valsts, ciemos, šajā, naktī, savādāk, lāčplēša, nedēļu, kādas, savā, pirmdien, dzīvē, dziesmu, liels, jauns, telefonu, latviešu, uzreiz, sāku, krievu, mācīties, vajadzētu, mācos, izmēģini, iedomājieties, forša, vārda, virtuālā, lekcija, reisā, tevis, tālāk, dzīvi, pavisam, priekš, mammu, dziesma, itkā, saprotu, draugiem, jauna, gultā, joprojām, besī, māju, runā, pirmais, spēlē, saprast, tiekamies, tūlīt, sākas, šobrīd, pareizi, jautājums, darbā, galvenais, priekšā, jaunu, šonakt, citi, angļu, gribētu, šodienas, gribās, bijām, vienā, varēšu, ejam, šoreiz, māsu, spēles, reizes, gāja, kurā, augšā, neiet, spēli, pagaidām, pavadīta, paši, trīs, filmas, galā, jūsu, mūzika, izrādās, kādi, lieliska, līdzi, cikos, sanāca, lieliski, gribēju, meitene, jaunā, aizmigt, šodiena, jāceļas, šorīt, ziņu, izdevusies, pasaules, brīvlaiks, vakardienas, vajadzēja, labākais, dzīvot, kādreiz, nozīmē, garām, beigās, mūziku, naudu, jādodas, lekciju, likās, gultas, vaļā, dzīves, twitterspēks, kārtīgi, redzēju, dziesmas, cilvēkus, sirds, varēs, tātad, vienīgais, pašu, piemēram, rakstīt, valodā, kājas, sanāk, kapēc, būsi, liela, koncerts, vārdu, zināt, brāli, ziema, pasaulē, ideāli, nogurums, agrāk, skaidrs, vējš, negrib, ceturtdien, skaisti, šito, izdarīt'}
#    'track': 'jā, nē, būs, kā, arī, tomēr, laigan, mēs, jūs, viņš, viņa, viņi, šis, šī, šo, labs, labi, slikts, slikti, vakar, šodien, rīt, parīt, nākamnedēļ, pirmdiena, pirmdien, pirmdienā, otrdiena, otrdien, otrdienā, trešdiena, trešdien, trešdienā, ceturtdiena, ceturtdien, ceturdienā, piektdiena, piektdien, piektdienā, sestdiena, sestdien, sestdienā, svētdiena, svētdien, svētdienā, latvija, latvieši, jāņi, jāņos, rīga, labrīt, nakts, rīts, diena, pusdienas, vakariņas, brokastis, ēst, mācās, mācos, twitterspēks, pulkstenis, miegs, gulēt, filma, mīlu, iela, ielā, ielu, piemēram, piemērs, atzīme, ziņas, vasara, vasaru, vasarā, rudens, rudeni, rudenī, ziema, ziemu, ziemā, pavasaris, pavasarī, pavasari, šņabis, šnabi, treniņš, terniņā, treniņu, kurss, kursos, kursiem, lekcija, lekcijā, lekciju, mamma, tētis, sencis, muča, muteri, māsa, māsu, brālis, brāli'}

class TwitterStream:
    def __init__(self):
        self.oauth_token = oauth.Token(key=OAUTH_KEYS['access_token_key'], secret=OAUTH_KEYS['access_token_secret'])
        self.oauth_consumer = oauth.Consumer(key=OAUTH_KEYS['consumer_key'], secret=OAUTH_KEYS['consumer_secret'])
        self.conn = None
        self.buffer = ''
        self.setup_connection()
        self.db = MySQLdb.connect(host = DB_HOST, port = DB_PORT, user = DB_USER, passwd = DB_PASSWORD, db = DB_TABLE, charset = 'utf8')
        self.no_client = MongoClient('localhost', 27017)
        self.no_db = self.no_client.twitter
        self.cur = self.db.cursor()

    def __del__(self):
        self.db.close()
        self.no_client.close()

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
        """ Start listening to Streaming endpoint. Handle exceptions according to Twitter's recommendations.
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
                # Save tweet in CSV file
                #self.save_tweet_csv(message)

                # Save tweet in database
                #self.save_tweet_db(message)

                # Save tweet in NoSQL
                self.save_tweet_nosql(message)

    def save_tweet_db(self, message):
        """ This method saves tweets into database.
            """

        try:
            # Get local timestamp from twitter time
            time = datetime.datetime.strptime(message.get('created_at'),'%a %b %d %H:%M:%S +0000 %Y')
            utc_created_at = timezone('UTC').localize(time)
            localTime = utc_created_at.astimezone(timezone('Europe/Riga'))
            timestamp = int(localTime.strftime("%s"))

            if message.get('retweeted_status') != None:
                # Save retweet
                self.cur.execute("INSERT INTO `retweets`(`tweet_id`, `user_id`, `created_at`) VALUES (%s, %s, %s)", (str(message.get('retweeted_status').get('id')), str(message.get('user').get('id')), str(timestamp)))

                # Update original tweet
                self.cur.execute("UPDATE `tweets` SET `favorite_count` = %s, `retweeted_count` = %s WHERE `id` = %s", (str(message.get('retweeted_status').get('favorite_count')), str(message.get('retweeted_status').get('retweet_count')), str(message.get('retweeted_status').get('id'))))
            else:
                # Save tweet
                # Determine if reply to screen name
                inReplyToScreenName = message.get('in_reply_to_screen_name') if message.get('in_reply_to_screen_name') else None
                # Determine if reply to status id
                inReplyToStatusIdStr = message.get('in_reply_to_status_id_str') if message.get('in_reply_to_status_id_str') else None
                # Determine if reply to user id
                inReplyToUserIdStr = message.get('in_reply_to_user_id_str') if message.get('in_reply_to_user_id_str') else None
                # Determine if truncated
                truncated = 1 if message.get('truncated') else 0
                # Determine if there are no urls
                if message.get('entities').get('urls') == []:
                    urls = None
                else:
                    urls = json.dumps(message.get('entities').get('urls'), ensure_ascii=False)
                self.cur.execute("INSERT INTO `tweets`(`id`, `user_id`, `text`, `urls`, `created_at`, `favorite_count`, `filter_level`, `in_reply_to_screen_name`, `in_reply_to_status_id`, `in_reply_to_user_id_str`, `lang`, `retweeted_count`, `source`, `truncated`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (str(message.get('id')), str(message.get('user').get('id')), message.get('text'), urls, str(timestamp), str(message.get('user').get('favourites_count')), message.get('filter_level'), inReplyToScreenName, inReplyToStatusIdStr, inReplyToUserIdStr, message.get('lang'), str(message.get('retweet_count')), message.get('source'), str(truncated)))

                # Check if coordinates set in tweet and already exist in system
                if message.get('coordinates') != None:
                    coord = message.get('coordinates').get('coordinates')
                    coordx = coord[1]
                    coordy = coord[0]
                    self.cur.execute("SELECT * FROM `coordinates` WHERE `coordinates` = %s", str(coordx) + "," + str(coordy))
                    existingCoord = self.cur.fetchone()
                    if existingCoord != None:
                        # Update existing coordinate count
                        count = existingCoord[3] + 1
                        id = existingCoord[0]
                        self.cur.execute("UPDATE `coordinates` SET `count` = %s WHERE `id` = %s", (str(count), str(id)))
                    else:
                        # Create new coordinate
                        self.cur.execute("INSERT INTO `coordinates`(`coordinates`, `type`, `count`) VALUES (%s, %s, 1)", (str(coordx) + "," + str(coordy), message.get('coordinates').get('type')))

                        self.cur.execute("SELECT * FROM `coordinates` WHERE `coordinates` = %s", str(coordx) + "," + str(coordy))
                        existingCoord = self.cur.fetchone()

                    # Create coordinate and tweet relation
                    self.cur.execute("INSERT INTO `has_coordinates`(`coordinate_id`, `tweet_id`, `user_id`) VALUES (%s, %s, %s)", (str(existingCoord[0]), str(message.get('id')), str(message.get('user').get('id'))))

                # Check if hashtags set in tweet and already exist in system
                if message.get('entities').get('hashtags') != []:
                    processed_hashtags = []
                    has_hashtags_data = []
                    for hashtag in message.get('entities').get('hashtags'):
                        self.cur.execute("SELECT * FROM `hashtags` WHERE `hashtag` = %s", hashtag.get('text'))
                        existingHashtag = self.cur.fetchone()
                        if existingHashtag != None:
                            hashtag_id = str(existingHashtag[0])
                        else:
                            # Create hashtag
                            self.cur.execute("INSERT INTO `hashtags`(`hashtag`) VALUES (%s)", hashtag.get('text'))

                            self.cur.execute("SELECT * FROM `hashtags` WHERE `hashtag` = %s", hashtag.get('text'))
                            newHashtag = self.cur.fetchone()
                            hashtag_id = str(newHashtag[0])

                        if hashtag_id in processed_hashtags:
                            hashtag_index = processed_hashtags.index(hashtag_id)
                            #Increase occurences
                            has_hashtags_data[hashtag_index][3] += 1
                        else:
                            processed_hashtags.append(hashtag_id)
                            has_hashtags_data.append([hashtag_id, str(message.get('id')), str(message.get('user').get('id')), 1])

                    #Create relations for all hashtags
                    self.cur.executemany("INSERT INTO `has_hashtags`(`hashtag_id`, `tweet_id`, `user_id`, `occurrences`) VALUES (%s, %s, %s, %s)", has_hashtags_data)

                # Check if users mentioned in tweet
                if message.get('entities').get('user_mentions') != []:
                    processed_mentions = []
                    user_mentions_data = []
                    for mention in message.get('entities').get('user_mentions'):
                        if mention.get('id') in processed_mentions:
                            mention_index = processed_mentions.index(mention.get('id'))
                            #Increase occurences
                            user_mentions_data[mention_index][3] += 1
                        else:
                            processed_mentions.append(mention.get('id'))
                            user_mentions_data.append([str(message.get('id')), str(mention.get('id')), str(timestamp), 1])

                    self.cur.executemany("INSERT INTO `user_mentions`(`tweet_id`, `user_id`, `mentioned_at`, `occurrences`) VALUES (%s, %s, %s, %s)", user_mentions_data)

            # Determine if location is set
            location = message.get('user').get('location') if message.get('user').get('location') else None
            # Determine if time zone is set
            timeZone = message.get('user').get('time_zone') if message.get('user').get('time_zone') else None
            # Determine if geo is enabled
            geoEnabled = 1 if message.get('user').get('geo_enabled') else 0
            # Determine if user account is protected
            protected = 1 if message.get('user').get('protected') else 0
            # Determine if users default profile
            defaultProfile = 1 if message.get('user').get('default_profile') else 0
            # Determine if user is translator
            isTranslator = 1 if message.get('user').get('is_translator') else 0
            # Determine if user is verified
            verified = 1 if message.get('user').get('verified') else 0
            # Determine if contributors enabled
            contributorsEnabled = 1 if message.get('user').get('contributors_enabled') else 0

            # Determine if using background image
            useBackgroundImage = 1 if message.get('user').get('profile_use_background_image') else 0
            # Determine if default profile image
            defaultProfileImage = 1 if message.get('user').get('default_profile_image') else 0
            # Determine if background tile
            backgroundTile = 1 if message.get('user').get('profile_background_tile') else 0

            # Check if user already in system
            self.cur.execute("SELECT `id` FROM `users` WHERE `id` = %s", str(message.get('user').get('id')))
            existingUser = self.cur.fetchone()
            if existingUser != None:
                # Update existing user fields
                self.cur.execute("UPDATE `users` SET `followers_count` = %s, `listed_count` = %s, `statuses_count` = %s, `friends_count` = %s, `location` = %s, `geo_enabled` = %s, `name` = %s, `lang` = %s, `favourites_count` = %s, `screen_name` = %s, `created_at` = %s, `protected` = %s, `url` = %s, `contributors_enabled` = %s, `time_zone` = %s, `default_profile` = %s, `is_translator` = %s, `description` = %s, `verified` = %s WHERE `id` = %s", (str(message.get('user').get('followers_count')), str(message.get('user').get('listed_count')), str(message.get('user').get('statuses_count')), str(message.get('user').get('friends_count')), location, str(geoEnabled), message.get('user').get('name'), str(message.get('user').get('lang')), str(message.get('user').get('favourites_count')), message.get('user').get('screen_name'), str(timestamp), str(protected), message.get('user').get('url'), str(contributorsEnabled), timeZone, str(defaultProfile), str(isTranslator), message.get('user').get('description'), str(verified), str(message.get('user').get('id'))))

                self.cur.execute("UPDATE `user_profile` SET `use_background_image` = %s, `default_profile_image` = %s, `image_url_https` = %s, `sidebar_fill_color` = %s, `text_color` = %s, `sidebar_border_color` = %s, `background_color` = %s, `background_image_url_https` = %s, `link_color` = %s, `image_url` = %s, `banner_url` = %s, `background_image_url` = %s, `background_tile` = %s WHERE `user_id` = %s", (str(useBackgroundImage), str(defaultProfileImage), str(message.get('user').get('profile_image_url_https')), str(message.get('user').get('profile_sidebar_fill_color')), str(message.get('user').get('profile_text_color')), str(message.get('user').get('profile_sidebar_border_color')), str(message.get('user').get('profile_background_color')), str(message.get('user').get('profile_background_image_url_https')), str(message.get('user').get('profile_link_color')), str(message.get('user').get('profile_image_url')), str(message.get('user').get('profile_banner_url')), str(message.get('user').get('profile_background_image_url')), str(backgroundTile), str(message.get('user').get('id'))))
            else:
                # Create new user in system
                self.cur.execute("INSERT INTO `users` (`id`, `followers_count`, `listed_count`, `statuses_count`, `friends_count`, `location`, `geo_enabled`, `name`, `lang`, `favourites_count`, `screen_name`, `created_at`, `protected`, `url`, `contributors_enabled`, `time_zone`, `default_profile`, `is_translator`, `description`, `verified`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (str(message.get('user').get('id')), str(message.get('user').get('followers_count')), str(message.get('user').get('listed_count')), str(message.get('user').get('statuses_count')), str(message.get('user').get('friends_count')), location, str(geoEnabled), message.get('user').get('name'), str(message.get('user').get('lang')), str(message.get('user').get('favourites_count')), message.get('user').get('screen_name'), str(timestamp), str(protected), message.get('user').get('url'), str(contributorsEnabled), timeZone, str(defaultProfile), str(isTranslator), message.get('user').get('description'), str(verified)))

                self.cur.execute("INSERT INTO `user_profile` (`user_id`, `use_background_image`, `default_profile_image`, `image_url_https`, `sidebar_fill_color`, `text_color`, `sidebar_border_color`, `background_color`, `background_image_url_https`, `link_color`, `image_url`, `banner_url`, `background_image_url`, `background_tile`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (str(message.get('user').get('id')), str(useBackgroundImage), str(defaultProfileImage), str(message.get('user').get('profile_image_url_https')), str(message.get('user').get('profile_sidebar_fill_color')), str(message.get('user').get('profile_text_color')), str(message.get('user').get('profile_sidebar_border_color')), str(message.get('user').get('profile_background_color')), str(message.get('user').get('profile_background_image_url_https')), str(message.get('user').get('profile_link_color')), str(message.get('user').get('profile_image_url')), str(message.get('user').get('profile_banner_url')), str(message.get('user').get('profile_background_image_url')), str(backgroundTile)))

            # Commit changes to database
            self.db.commit()

        except MySQLdb.Error, e:
            # Error while saving tweet
            self.db.rollback()
            # Log mysql error, executed query and tweet data
            print "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
            print self.cur._last_executed


    def save_tweet_nosql(self, message):
        """ This method saves tweets into database.
            """

        try:
            # Save DB system ID as twitter id
            message['_id'] = message.get('id')
            del message['id']
            self.no_db.tweets.save(message)

        except pymongo.errors:
            # Saving error
            print "saving tweet error:"
            pprint.pprint(pymongo.errors)


    def save_tweet_csv(self, message):
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
        file.write(',' + json.dumps(message.get('user').get('url'), ensure_ascii=False))
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
