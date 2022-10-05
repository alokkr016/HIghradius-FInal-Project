package com.highradius;

import java.io.IOException;
import java.sql.*;
import java.util.HashMap;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/DeleteFunction")
public class DeleteFunction extends HttpServlet {
  private static final long serialVersionUID = 1L;

    public DeleteFunction() {
        super();
        // TODO Auto-generated constructor stub
    }


  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // TODO Auto-generated method stub
    
    try {
      HashMap<Object, Object> Response = new HashMap<Object, Object>();
      String sl_no = request.getParameter("sl_no");

      Connection con = GetDatabaseConnection.getConnection();
      String query = "delete from winter_internship where sl_no in (" + sl_no + ")";
      PreparedStatement ps = con.prepareStatement(query);

      
      if (ps.executeUpdate() > 0) {
      Response.put("update", true);
      } else {
      Response.put("update", false);
      }
      Gson gson = new Gson();
      response.setHeader("Access-Control-Allow-Origin", "*");
      String Responsejson = gson.toJson(Response);
      response.getWriter().append(Responsejson);
      } catch (Exception e) {
      e.printStackTrace();
      }
      }

    
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // TODO Auto-generated method stub
    doGet(request, response);
  }

}