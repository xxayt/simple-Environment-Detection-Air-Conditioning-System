package DAO;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Database {
    private Connection connection;
    private Statement statement;
    public Database() {
        // 开始连接数据库，需要先把mysql-connector-java-5.0.4-bin.jar和json.jar拷贝到ROOT/WEB-INF/lib下
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException classnotfoundexception) {
            classnotfoundexception.printStackTrace();
        }

        // 然后链接数据库，开始操作数据表
        try {
            String username = "debian-sys-maint";
            String password = "v2OjcOzw4TXmeGDg";
            String connStr="jdbc:mysql://localhost:3306/environment?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
            connection = DriverManager.getConnection(connStr,username,password);
            System.out.println(connection);
            statement = connection.createStatement();
        } catch (SQLException sqlexception) {
            sqlexception.printStackTrace();
        }
    }
    public ResultSet executeQuery(String sql){
        ResultSet resultset = null;
        try {
            resultset = statement.executeQuery(sql);
        } catch (SQLException sqlexception) {
            sqlexception.printStackTrace();
        }
        return resultset;
    }
    public void executeUpdate(String sql){
        try {
            statement.executeUpdate(sql);
        } catch (SQLException sqlexception) {
            sqlexception.printStackTrace();
        }
    }
    public void close() {
        try {
            statement.close();
            connection.close();
        } catch (SQLException sqlexception) {
            sqlexception.printStackTrace();
        }
    }
}
