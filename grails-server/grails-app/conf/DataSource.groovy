dataSource {
    pooled = true
    driverClassName = "com.mysql.jdbc.Driver"
    dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
	//configure DBCP
	properties {
		maxActive = 50
		maxIdle = 25
		minIdle = 1
		initialSize = 1
		minEvictableIdleTimeMillis = 60000
		timeBetweenEvictionRunsMillis = 60000
		numTestsPerEvictionRun = 3
		maxWait = 10000

		testOnBorrow = true
		testWhileIdle = true
		testOnReturn = false

		validationQuery = "SELECT 1"
	}
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = true
    cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}
// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = 'create-drop' // one of 'create', 'create-drop','update'
		url = "jdbc:mysql://localhost:3306/wine?autoReconnect=true"
            	username = "root"
            	password = "mirko"
		}
        hibernate {
            show_sql = true
        }
    }
    test {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop','update'
		url = "jdbc:mysql://test:3306/wine?autoReconnect=true"
		username = "root"
		password = "mirko"
        }
    }
    production {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop','update'
		url = "jdbc:mysql://prod:3306/wine?autoReconnect=true"
            	username = "root"
            	password = "mirko"
        }
    }
}
