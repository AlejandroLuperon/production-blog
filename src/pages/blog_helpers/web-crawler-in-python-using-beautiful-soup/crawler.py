import urllib2
import httplib2
from html import HTML
from bs4 import BeautifulSoup
import re
import mysql.connector
import os

url_checked = []

http = httplib2.Http()

local_host = 'localhost';
local_username = 'alejandro'
local_password = '9016403'
local_database = 'scraper'
local_port = '3306'

local_mysql_connection = mysql.connector.connect(host=local_host,user=local_username,database=local_database,password=local_password,port=local_port)
local_mysql_cursor = local_mysql_connection.cursor(buffered=True)

north_east = ['adamawa','bauchi','borno','gombe','taraba','yobe']
north_central = ['benue','kogi','kwara','nasarawa','niger','federal capital territory','plateau']
north_west = ['Kaduna','Kano','Kebbi','Sokoto','Zamfara','Katsina']
south_south = ['Rivers','Edo','Akwa Ibom','Bayelsa','Cross River','Delta']
south_west = ['Lagos','Ogun','Ondo','Osun','Oyo','Ekiti']
south_east = ['abia','anambra','ebonyi','enugu','imo']

keyword_array = ['Projects','China','Chinese','Construction','Construct','Build','Contractor','Contractors','Nigeria','Projects','Infrastructure']

crawl_depth_limit = 20

http = httplib2.Http()

links = []
urls = [
	{'url':'http://www.allafrica.com','crawl_depth':20,'type':'public'},
]

for url in urls:

	try:
		crawl_depth = url['crawl_depth']
		site_type = url['type']
		url = url['url']

		regions = []
		keywords = []
		html = ''

		status, response = http.request(url)
		soup = BeautifulSoup(response.lower(),"html.parser")

		links = soup.find_all('a',href=True)


		for link in links:
			url_scan = {}
			href = link.get('href')
			url_scan['crawl_depth'] = crawl_depth + 1
			url_scan['type'] = site_type
			if href[:4] == 'http':
				url_scan['url'] = href
			else:
				url_scan['url'] = url + href

			if url_scan not in urls:
				urls.append(url_scan)

		ps = soup.find_all('p')

		for p in ps:

			html = html + p.get_text().encode('utf-8')

		#print html

		###Search Text###
		for word in keyword_array:
			word = word.lower()
			if word in html:
				keywords.append(word)

		for region in north_west:
			region = region.lower()
			if region in html:
				regions.append('North West')
				keywords.append(region)

		for region in north_central:
			region = region.lower()
			if region in html:
				regions.append('North Central')
				keywords.append(region)

		for region in north_east:
			region = region.lower()
			if region in html:
				regions.append('North East')
				keywords.append(region)

		for region in south_east:
			region = region.lower()
			if region in html:
				regions.append('South East')
				keywords.append(region)

		for region in south_south:
			region = region.lower()
			if region in html:
				regions.append('South South')
				keywords.append(region)

		for region in south_west:
			region = region.lower()
			if region in html:
				regions.append('South West')
				keywords.append(region)

		regions = ','.join(regions)
		keywords = ','.join(keywords)

		###Save Text###
		filename = re.sub(r'[^a-zA-Z0-9]','', url)
		filename = filename[0:250]

		if 'South West' in regions:
			new_file = open('/all_africa_scrape/south_west/'+filename+'.txt','w')
			new_file.write(html)

		if 'South South' in regions:
			new_file = open('/all_africa_scrape/south_south/'+filename+'.txt','w')
			new_file.write(html)


		if 'South East' in regions:
			new_file = open('/all_africa_scrape/south_east/'+filename+'.txt','w')
			new_file.write(html)

		if 'North East' in regions:
			new_file = open('/all_africa_scrape/north_east/'+filename+'.txt','w')
			new_file.write(html)


		if 'North West' in regions:
			new_file = open('/all_africa_scrape/north_west/'+filename+'.txt','w')
			new_file.write(html)


		if 'North Central' in regions:
			new_file = open('/all_africa_scrape/north_central/'+filename+'.txt','w')
			new_file.write(html)


		insert_sql = ("INSERT INTO all_africa_scrape(url,keywords,regions,scanned,filename,site_type) VALUES(%s,%s,%s,%s,%s,%s)")
		insert_data = (url,regions,keywords,1,filename,site_type)
		local_mysql_cursor.execute(insert_sql,insert_data)
		local_mysql_connection.commit()
	except:
		print 'URL Failed'

local_mysql_cursor.close()
local_mysql_connection.close()
