<?php
/**
 * @package  app
 * @extends  Controller_Public
 */
class Controller_Coordinates extends Controller_Public
{
    /**
     * Show top coordinates
     * @param int $count
     */
    public function action_index($count = 15)
    {
        $data['coordinates'] = Model_Coordinates::getTopCoordinates($count);
        $data['maxTopVenues'] = ($count > 15 ? 15 : $count);
        $this->template->content = View::forge('coordinates/index', $data);
    }

    public function action_infowindow()
    {
        $requestedData = 'all';
        if (isset($_GET['data'])) {
            $requestedData = $_GET['data'];
        }
        $venue = $this->getFoursquareVenueData(Input::post('pointLat'), Input::post('pointLng'), $requestedData);
        if ($requestedData != 'all') {
            echo $venue;
        } else {
            $venue['latlng'] = Input::post('pointLat') . ', ' . Input::post('pointLng');
            $venue['venueId'] = Input::post('pointId');
            $venue['pointCount'] = Input::post('pointCount');
            $data['venue'] = $venue;
            return render('coordinates/infowindow', $data);
        }
    }

    /**
     * Show venue info window
     */
    public function action_venueInfo()
    {
        $venueName = (Input::get('name') != null) ? Input::get('name') : null;
        $venueId = (Input::get('pointid') != null) ? Input::get('pointid') : null;
        $topUserCount = (Input::get('users') != null) ? Input::get('users') : 0;
        $topTweetCount = (Input::get('tweets') != null) ? Input::get('tweets') : 0;
        $usersFrom = (Input::get('usersfrom') != null) ? Input::get('usersfrom') : 0;
        $tweetsFrom = (Input::get('tweetsfrom') != null) ? Input::get('tweetsfrom') : 0;
        if (isset($venueId)) {
            $data['tweets'] = $this->getTweets($venueId, $topTweetCount, $tweetsFrom);
            $this->template->content = View::forge('coordinates/venue', $data);
        }
    }

    /**
     * Get foursqure client data
     * @return array
     */
    protected function getFoursquareClientData()
    {
        return array(Config::get('client_id'), Config::get('client_secret'));
    }

    /**
     * Get venue data from foursquare
     * @param $pointLat
     * @param $pointLng
     * @param $requestedData
     * @return array $venue
     */
    protected function getFoursquareVenueData($pointLat, $pointLng, $requestedData)
    {
        $client = $this->getFoursquareClientData();
        $coordinates = $pointLat . '%2C' . $pointLng;
        $requestUrl = 'https://api.foursquare.com/v2/venues/search?ll=' . $coordinates
                    . '&limit=1&intent=browse&radius=15&client_id=' . $client[0] . '&client_secret='
                    . $client[1] . '&v=20131119';
        $curlhandle = curl_init();
        curl_setopt($curlhandle, CURLOPT_URL, $requestUrl);
        curl_setopt($curlhandle, CURLOPT_RETURNTRANSFER, 1);

        $response = curl_exec($curlhandle);
        curl_close($curlhandle);
        $json = json_decode($response, true);

        if (isset($json['response']['venues'][0])) {
            $venue = $json['response']['venues'][0];
            if ($requestedData != 'all') {
                echo $venue[$requestedData];
            } else {
                return $venue;
            }
        } else {
            return null;
        }
    }

    protected function getUsers($venueId, $topUserCount, $from) {
        return Model_User_Account::getTopUsersFromVenue($venueId, $topUserCount, $from);
    }

    protected function getTweets($venueId, $topTweetCount, $from) {
        return Model_Tweet::getTopTweetsFromVenue($venueId, $topTweetCount, $from);
    }

}
