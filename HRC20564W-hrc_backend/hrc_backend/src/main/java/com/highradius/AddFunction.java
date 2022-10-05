package com.highradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.HashMap;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/AddFunction")
public class AddFunction extends HttpServlet {
    
    private static final long serialVersionUID = 1L;

    public AddFunction() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HashMap<Object, Object> Response = new HashMap<Object, Object>();
        try {

            String businessCode = request.getParameter("business_code");
            String customerNumber = request.getParameter("cust_number");
            String clearDate = request.getParameter("clear_date");
            String businessYear = request.getParameter("buisness_year");
            String documentId = request.getParameter("doc_id");
            String postingDate = request.getParameter("posting_date");
            String documentCreateDate = request.getParameter("document_create_date");
            String dueDate = request.getParameter("due_in_date");
            String invoiceCurrency = request.getParameter("invoice_currency");
            String documentType = request.getParameter("document_type");
            String postingId = request.getParameter("posting_id");
            String totalOpenAmount = request.getParameter("total_open_amount");
            String baselineCreateDate = request.getParameter("baseline_create_date");
            String customerPaymentTerms = request.getParameter("cust_payment_terms");
            String invoiceId = request.getParameter("invoice_id");


            Connection con = GetDatabaseConnection.getConnection();
            String cmd = "";
            String query =  "insert into winter_internship(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";

            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, businessCode);
            ps.setString(2, customerNumber);
            ps.setString(3, clearDate);
            ps.setString(4, businessYear);
            ps.setString(5, documentId);
            ps.setString(6, postingDate);
            ps.setString(7, documentCreateDate);
            ps.setString(8, dueDate);
            ps.setString(9, invoiceCurrency);
            ps.setString(10, documentType);
            ps.setString(11, postingId);
            ps.setString(12, totalOpenAmount);
            ps.setString(13, baselineCreateDate);
            ps.setString(14, customerPaymentTerms);
            ps.setString(15, invoiceId);

            int rs = ps.executeUpdate();
            System.out.println(rs);

            if (rs > 0) {
                Response.put("insert", true);
            } else {
                Response.put("insert", false);
            }



            Gson gson = new Gson();
            String JSONresponse = gson.toJson(Response);
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.getWriter().append(JSONresponse);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // TODO Auto-generated method stub
        doGet(request, response);
    }

}