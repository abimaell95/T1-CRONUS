import sys
import logging
import MySQLdb

from django.core.management.base import BaseCommand

rds_host = 'mynewcluster.cluster-cb42naljehp6.us-west-2.rds.amazonaws.com'
db_name = 'cronus'
user_name = 'cronusadmin'
password = 'cronus2022'
port = 3306

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class Command(BaseCommand):
    help = 'Creates the initial database'

    def handle(self, *args, **options):
        print('Starting db creation')
        try:
            db = MySQLdb.connect(host=rds_host, user=user_name,
                                 password=password, db="mysql", connect_timeout=5)
            c = db.cursor()
            print("connected to db server")
            c.execute("""CREATE DATABASE cronus;""")
            c.execute(
                """GRANT ALL PRIVILEGES ON db_name.* TO 'cronusadmin' IDENTIFIED BY 'cronus2022';""")
            c.close()
            print("closed db connection")
        except:
            logger.error(
                "ERROR: Unexpected error: Could not connect to MySql instance.")
            sys.exit()
