package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet("/FetchDataServlet")
public class FetchDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public FetchDataServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		int page = Integer.parseInt(request.getParameter("page"));
		if (page < 1) {
			page = 1;
		}
		int records_per_page = Integer.parseInt(request.getParameter("size"));

		Connection conn = null;
		Statement stmt = null;
		String sql = null;
		ResultSet rs = null;
		int sl_no = 0;
		String business_code = null;
		int cust_number = 0;
		String clear_date = null;
		String buisness_year = null;
		String doc_id = null;
		String posting_date = null;
		String document_create_date = null;
		String document_create_date1 = null;
		String due_in_date = null;
		String invoice_currency = null;
		String document_type = null;
		int posting_id = 0;
		String area_business = null;
		double total_open_amount = 0;
		String baseline_create_date = null;
		String cust_payment_terms = null;
		int invoice_id = 0;
		int isOpen = 0;
		String aging_bucket = null;
		int is_deleted = 0;

		HashMap<Object, Object> Response = new HashMap<>();
		List<FetchDataPojo> responseList = new ArrayList<>();

		try {

			conn = GetDatabaseConnection.getConnection();
			stmt = conn.createStatement();
			sql = "select sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id from winter_internship limit "
					+ (page - 1) * records_per_page + "," + records_per_page;
			rs = stmt.executeQuery(sql);

			while (rs.next()) {
				FetchDataPojo pojoResponse = new FetchDataPojo();
				sl_no = rs.getInt("sl_no");
				business_code = rs.getString("business_code");
				cust_number = rs.getInt("cust_number");
				clear_date = rs.getString("clear_date");
				buisness_year = rs.getString("buisness_year");
				doc_id = rs.getString("doc_id");
				posting_date = rs.getString("posting_date");
				document_create_date = rs.getString("document_create_date");
				due_in_date = rs.getString("due_in_date");
				invoice_currency = rs.getString("invoice_currency");
				document_type = rs.getString("document_type");
				posting_id = rs.getInt("posting_id");
				area_business = rs.getString("area_business");
				total_open_amount = rs.getInt("total_open_amount");
				baseline_create_date = rs.getString("baseline_create_date");
				cust_payment_terms = rs.getString("cust_payment_terms");
				invoice_id = rs.getInt("invoice_id");

				pojoResponse.setSl_no(sl_no);
				pojoResponse.setBusiness_code(business_code);
				pojoResponse.setCust_number(cust_number);
				pojoResponse.setClear_date(clear_date);
				pojoResponse.setBuisness_year(buisness_year);
				pojoResponse.setDoc_id(doc_id);
				pojoResponse.setPosting_date(posting_date);
				pojoResponse.setDocument_create_date(document_create_date);
//				pojoResponse.setDocument_create_date1(document_create_date1);
				pojoResponse.setDue_in_date(due_in_date);
				pojoResponse.setInvoice_currency(invoice_currency);
				pojoResponse.setDocument_type(document_type);
				pojoResponse.setPosting_id(posting_id);
//				pojoResponse.setArea_business(area_business);
				pojoResponse.setTotal_open_amount(total_open_amount);
				pojoResponse.setBaseline_create_date(baseline_create_date);
				pojoResponse.setCust_payment_terms(cust_payment_terms);
				pojoResponse.setInvoice_id(invoice_id);
//				pojoResponse.setIsOpen(isOpen);
//				pojoResponse.setAging_bucket(aging_bucket);
//				pojoResponse.setIs_deleted(is_deleted);

				responseList.add(pojoResponse);

			}

			Response.put("data", responseList);

			rs = stmt.executeQuery("select count(*) from winter_internship");
			while (rs.next()) {
				int count = rs.getInt(1);
				Response.put("count", count);
			}

			rs = stmt.executeQuery("SELECT DISTINCT(cust_number) FROM winter_internship");
			List<String> cust_number_list = new ArrayList<String>();
			while (rs.next()) {
				String cust_numbers = rs.getString(1);
				cust_number_list.add(cust_numbers);
			}
			Response.put("cust_list", cust_number_list);

			rs = stmt.executeQuery("SELECT DISTINCT(business_code) FROM winter_internship");
			List<String> business_code_list = new ArrayList<String>();
			while (rs.next()) {
				String business_codes = rs.getString(1);
				business_code_list.add(business_codes);
			}

			Response.put("business_code_list", business_code_list);

			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			String json = gson.toJson(Response);
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.setContentType("application/json");
			try {
				response.getWriter().write(json);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				stmt.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
