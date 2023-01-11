package com.webproject.webproject;

import DAO.Database;
import org.json.JSONObject;

import java.io.*;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "CheckEnvironmentRecord", value = "/checkEnvironmentRecord")
public class checkEnvironmentRecord extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doCheckEnvironmentRecord(req, resp);
    }

    public void doCheckEnvironmentRecord(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{

        Database database = new Database();

        boolean status = false;
        ArrayList<Map> environmentRecordList = new ArrayList();
        String sql="select * from environment order by recordId;";
        try{
            ResultSet rs = database.executeQuery(sql);
            ResultSetMetaData rsmd = rs.getMetaData();
            int fieldCount = rsmd.getColumnCount();
            while (rs.next()) {
                Map map = new HashMap();
                for (int i=0;i<fieldCount;i++) {
                    map.put(rsmd.getColumnName(i+1), rs.getString(rsmd.getColumnName(i+1)));
                }
                environmentRecordList.add(map);
            }
            status = true;
            rs.close();
        }catch (Exception e) {
            e.printStackTrace();
        }

        database.close();

        // generate json
        JSONObject json = new JSONObject();
        try {
            json.put("status", status);
            json.put("record", environmentRecordList);
        }catch (Exception e) {
            e.printStackTrace();
        }

        // response back
        resp.setContentType("application/json; charset=UTF-8");
        resp.getWriter().print(json);
        resp.getWriter().flush();
        resp.getWriter().close();
    }
}