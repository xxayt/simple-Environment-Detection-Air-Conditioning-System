package com.webproject.webproject;

import DAO.Database;
import org.json.JSONObject;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "EnvironmentRecord", value = "/environmentRecord")
public class EnvironmentRecord extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doEnvironmentRecord(req, resp);
    }

    public void doEnvironmentRecord(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        req.setCharacterEncoding("UTF-8");
        String temperature = req.getParameter("temperature");
        String humidity = req.getParameter("humidity");
        String time = req.getParameter("time");
        System.out.println(temperature);
        Database database = new Database();

        boolean status = false;
        if(temperature != null && humidity != null && time != null){
            String sql="insert into environment(temperature,humidity,time) values(";
            sql=sql+"'"+temperature+"'";
            sql=sql+",";
            sql=sql+"'"+humidity+"'";
            sql=sql+",";
            sql=sql+"'"+time+"'";
            sql=sql+")";
            try {
                database.executeUpdate(sql);
            }catch (Exception e) {
                e.printStackTrace();
            }
            status = true;
        }

        database.close();

        // generate json
        JSONObject json = new JSONObject();
        try {
            json.put("status", status);
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