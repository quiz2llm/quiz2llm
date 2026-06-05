o sqlalchemy  conecta ao database via a funçao create_engine() isso conecta ao banco por uma url e retorna um objeto engine que conecta o python ao banco 

>  *URL Format: dialect+driver://username:password@host:port/database*
## Components:
-    dialect: database type (mysql, postgresql, sqlite)
-   driver: database connector library (pymysql, psycopg2)
-    username/password: login credentials
-    host/port: database server location
-    database: database name

