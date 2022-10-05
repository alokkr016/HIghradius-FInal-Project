package com.highradius;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;

public class GetDatabaseConnection {
	public static Connection getConnection() {
		    String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
		    String DB_URL = "jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
		    String USER = "root";
		    String PASSWORD = "alok@8450";
		    Connection conn = null;
		    
		    try {
		    	Class.forName(JDBC_DRIVER);
		    	conn = DriverManager.getConnection(DB_URL, USER, PASSWORD);
		    	System.out.println("Connection Successful");
				
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		    
		    return conn;
	}
}
