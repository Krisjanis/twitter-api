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
        self.cur = self.db.cursor()

    def __del__(self):
        self.db.close()
    
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
                # Save tweet in CSV file
                #self.save_tweet_csv(message)

                # Save tweet in database
                self.save_tweet_db(message)

    def save_tweet_db(self, message):
        """ This method saves tweets into database.
            """

        # Get current timestamp
        time = datetime.datetime.now()
        timestamp = calendar.timegm(time.utctimetuple())

        if message.get('retweeted_status') != None:
            # Save retweet
            try:
                self.cur.execute("INSERT INTO `retweets`(`tweet_id`, `user_id`, `created_at`) VALUES (" + str(message.get('retweeted_status').get('id')) + ", " + str(message.get('user').get('id')) + ", " + str(timestamp) + ")")
                self.db.commit()
            except:
                self.db.rollback()

             # Update original tweet
            try:
                self.cur.execute("UPDATE `tweets` SET `favorite_count` = " + str(message.get('retweeted_status').get('favorite_count')) + ", `favorite_count` = " + str(message.get('retweeted_status').get('retweet_count')) + " WHERE `id` = " + str(message.get('retweeted_status').get('id')))
                self.db.commit()
            except:
                self.db.rollback()
        else:
            # Save tweet
            # Determine if reply to screen name
            inReplyToScreenName = "'" + message.get('in_reply_to_screen_name') + "'" if message.get('in_reply_to_screen_name') else 'NULL'
            # Determine if reply to status id
            inReplyToStatusIdStr = message.get('in_reply_to_status_id_str') if message.get('in_reply_to_status_id_str') else 'NULL'
            # Determine if reply to user id
            inReplyToUserIdStr = message.get('in_reply_to_user_id_str') if message.get('in_reply_to_user_id_str') else 'NULL'
            # Determine if truncated
            truncated = 1 if message.get('truncated') else 0
            # Determine if there are no urls
            if message.get('entities').get('urls') == []:
                urls = 'NULL'
            else:
                urls = "'" + json.dumps(message.get('entities').get('urls'), ensure_ascii=False) + "'"
            try:
                self.cur.execute("INSERT INTO `tweets`(`id`, `user_id`, `text`, `urls`, `created_at`, `favorite_count`, `filter_level`, `in_reply_to_screen_name`, `in_reply_to_status_id`, `in_reply_to_user_id_str`, `lang`, `retweeted_count`, `source`, `truncated`) VALUES (" + str(message.get('id')) + ", " + str(message.get('user').get('id')) + ", '" + message.get('text') + "', " + urls + ", " + str(timestamp) + ", '" + str(message.get('user').get('favourites_count')) + "', '" + message.get('filter_level') + "', " + inReplyToScreenName + ", " + inReplyToStatusIdStr + ", " + inReplyToUserIdStr + ", '" + message.get('lang') + "', " + str(message.get('retweet_count')) + ", '" + message.get('source') + "', " + str(truncated) + ")")
                self.db.commit()
            except:
                self.db.rollback()

            # Check if coordinates set in tweet and already exist in system
            if message.get('coordinates') != None:
                coord = message.get('coordinates').get('coordinates')
                coordx = coord[1]
                coordy = coord[0]
                self.cur.execute("SELECT * FROM `coordinates` WHERE `coordinates` = '" + str(coordx) + "," + str(coordy) + "'")
                existingCoord = self.cur.fetchone()
                if existingCoord != None:
                    # Update existing coordinate count
                    count = existingCoord[3] + 1
                    id = existingCoord[0]
                    try:
                        self.cur.execute("UPDATE `coordinates` SET `count` = " + str(count) + " WHERE `id` = " + str(id))
                        self.db.commit()
                    except:
                        self.db.rollback()
                else:
                    # Create new coordinate
                    try:
                        self.cur.execute("INSERT INTO `coordinates`(`coordinates`, `type`, `count`) VALUES ('" + str(coordx) + "," + str(coordy) + "', '" + message.get('coordinates').get('type') + "', 1)")
                        self.db.commit()
                    except:
                        self.db.rollback()

                    self.cur.execute("SELECT * FROM `coordinates` WHERE `coordinates` = '" + str(coordx) + "," + str(coordy) + "'")
                    existingCoord = self.cur.fetchone()

                # Create coordinate and tweet relation
                try:
                    self.cur.execute("INSERT INTO `has_coordinates`(`coordinate_id`, `tweet_id`, `user_id`) VALUES (" + str(existingCoord[0]) + ", " + str(message.get('id')) + ", " + str(message.get('user').get('id')) + ")")
                    self.db.commit()
                except:
                    self.db.rollback()

            # Check if hashtags set in tweet and already exist in system
            if message.get('entities').get('hashtags') != []:
                for hashtag in message.get('entities').get('hashtags'):
                    self.cur.execute("SELECT * FROM `hashtags` WHERE `hashtag` = '" + hashtag.get('text') + "'")
                    existingHashtag = self.cur.fetchone()
                    if existingHashtag != None:
                        # Hashtag exists create relation
                        try:
                            self.cur.execute("INSERT INTO `has_hashtags`(`hashtag_id`, `tweet_id`, `user_id`) VALUES (" + str(existingHashtag[0]) + ", " + str(message.get('id')) + ", " + str(message.get('user').get('id')) + ")")
                            self.db.commit()
                        except:
                            self.db.rollback()
                    else:
                        # Create hashtag and create relation
                        try:
                            self.cur.execute("INSERT INTO `hashtags`(`hashtag`) VALUES ('" + str(hashtag.get('text')) + "')")
                            self.db.commit()
                        except:
                            self.db.rollback()

                        self.cur.execute("SELECT * FROM `hashtags` WHERE `hashtag` = '" + hashtag.get('text') + "'")
                        newHashtag = self.cur.fetchone()

                        try:
                            self.cur.execute("INSERT INTO `has_hashtags`(`hashtag_id`, `tweet_id`, `user_id`) VALUES (" + str(newHashtag[0]) + ", " + str(message.get('id')) + ", " + str(message.get('user').get('id')) + ")")
                            self.db.commit()
                        except:
                            self.db.rollback()

            # Check if users mentioned in tweet
            if message.get('entities').get('user_mentions') != []:
                for mention in message.get('entities').get('user_mentions'):
                    try:
                        self.cur.execute("INSERT INTO `user_mentions`(`tweet_id`, `user_id`, `mentioned_at`) VALUES (" + str(message.get('id')) + ", " + str(mention.get('id')) + ", " + str(timestamp) + ")")
                        self.db.commit()
                    except:
                        self.db.rollback()

        # Determine if location is set
        location = "'" + message.get('user').get('location') + "'" if message.get('user').get('location') else 'NULL'
        # Determine if time zone is set
        timeZone = "'" + message.get('user').get('time_zone') + "'" if message.get('user').get('time_zone') else 'NULL'
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
        self.cur.execute("SELECT `id` FROM `users` WHERE `id` = " + str(message.get('user').get('id')))
        existingUser = self.cur.fetchone()
        if existingUser != None:
            # Update existing user fields
            try:
                self.cur.execute("UPDATE `users` SET `followers_count` = " + str(message.get('user').get('followers_count')) + ", `listed_count` = " + str(message.get('user').get('listed_count')) + ", `statuses_count` = " + str(message.get('user').get('statuses_count')) + ", `friends_count` = " + str(message.get('user').get('friends_count')) + ", `location` = " + location + ", `geo_enabled` = " + str(geoEnabled) + ", `name` = " + json.dumps(message.get('user').get('name'), ensure_ascii=False) + ", `lang` = '" + str(message.get('user').get('lang')) + "', `favourites_count` = " + str(message.get('user').get('favourites_count')) + ", `screen_name` = " + json.dumps(message.get('user').get('screen_name'), ensure_ascii=False) + ", `created_at` = " + str(timestamp) + ", `protected` = " + str(protected) + ", `url` = " + json.dumps(message.get('user').get('url'), ensure_ascii=False) + ", `contributors_enabled` = " + str(contributorsEnabled) + ", `time_zone` = " + timeZone + ", `default_profile` = " + str(defaultProfile) + ", `is_translator` = " + str(isTranslator) + ", `description` = " + json.dumps(message.get('user').get('description'), ensure_ascii=False) + ", `verified` = " + str(verified) + " WHERE `id` = " + str(message.get('user').get('id')))
                self.db.commit()
            except:
                self.db.rollback()

            try:
                self.cur.execute("UPDATE `user_profile` SET `use_background_image` = '" + str(useBackgroundImage) + "', `default_profile_image` = '" + str(defaultProfileImage) + "', `image_url_https` = '" + str(message.get('user').get('profile_image_url_https')) + "', `sidebar_fill_color` = '" + str(message.get('user').get('profile_sidebar_fill_color')) + "', `text_color` = '" + str(message.get('user').get('profile_text_color')) + "', `sidebar_border_color` = '" + str(message.get('user').get('profile_sidebar_border_color')) + "', `background_color` = '" + str(message.get('user').get('profile_background_color')) + "', `background_image_url_https` = '" + str(message.get('user').get('profile_background_image_url_https')) + "', `link_color` = '" + str(message.get('user').get('profile_link_color')) + "', `image_url` = '" + str(message.get('user').get('profile_image_url')) + "', `banner_url` = '" + str(message.get('user').get('profile_banner_url')) + "', `background_image_url` = '" + str(message.get('user').get('profile_background_image_url')) + "', `background_tile` = '" + str(backgroundTile) + "' WHERE `user_id` = " + str(message.get('user').get('id')))
                self.db.commit()
            except:
                self.db.rollback()
        else:
            # Create new user in system
            try:
                self.cur.execute("INSERT INTO `users` (`id`, `followers_count`, `listed_count`, `statuses_count`, `friends_count`, `location`, `geo_enabled`, `name`, `lang`, `favourites_count`, `screen_name`, `created_at`, `protected`, `url`, `contributors_enabled`, `time_zone`, `default_profile`, `is_translator`, `description`, `verified`) VALUES (" + str(message.get('user').get('id')) + ", " + str(message.get('user').get('followers_count')) + ", " + str(message.get('user').get('listed_count')) + ", " + str(message.get('user').get('statuses_count')) + ", " + str(message.get('user').get('friends_count')) + ", " + location + ", " + str(geoEnabled) + ", " + json.dumps(message.get('user').get('name'), ensure_ascii=False) + ", '" + str(message.get('user').get('lang')) + "', " + str(message.get('user').get('favourites_count')) + ", " + json.dumps(message.get('user').get('screen_name'), ensure_ascii=False) + ", " + str(timestamp) + ", " + str(protected) + ", " + json.dumps(message.get('user').get('url'), ensure_ascii=False) + ", " + str(contributorsEnabled) + ", " + timeZone + ", " + str(defaultProfile) + ", " + str(isTranslator) + ", " + json.dumps(message.get('user').get('description'), ensure_ascii=False) + ", " + str(verified) + ")")
                self.db.commit()
            except:
                self.db.rollback()

            try:
                self.cur.execute("INSERT INTO `user_profile` (`user_id`, `use_background_image`, `default_profile_image`, `image_url_https`, `sidebar_fill_color`, `text_color`, `sidebar_border_color`, `background_color`, `background_image_url_https`, `link_color`, `image_url`, `banner_url`, `background_image_url`, `background_tile`) VALUES (" + str(message.get('user').get('id')) + ", " + str(useBackgroundImage) + ", " + str(defaultProfileImage) + ", '" + str(message.get('user').get('profile_image_url_https')) + "', '" + str(message.get('user').get('profile_sidebar_fill_color')) + "', '" + str(message.get('user').get('profile_text_color')) + "', '" + str(message.get('user').get('profile_sidebar_border_color')) + "', '" + str(message.get('user').get('profile_background_color')) + "', '" + str(message.get('user').get('profile_background_image_url_https')) + "', '" + str(message.get('user').get('profile_link_color')) + "', '" + str(message.get('user').get('profile_image_url')) + "', '" + str(message.get('user').get('profile_banner_url')) + "', '" + str(message.get('user').get('profile_background_image_url')) + "', " + str(backgroundTile) + ")")
                self.db.commit()
            except:
                self.db.rollback()

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
