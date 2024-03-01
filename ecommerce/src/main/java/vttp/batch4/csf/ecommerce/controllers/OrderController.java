package vttp.batch4.csf.ecommerce.controllers;


import java.util.Observable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
// @CrossOrigin
@RequestMapping(path="/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked


 @PostMapping(path="/Order")
 public ResponseEntity<String> postOrder(@RequestBody Order order) {
        System.out.println("Receive");
        System.out.println(order);
  return null;
 }

  // 	@PostMapping(
	// 	path = "/Order"
	// )
  // public ResponseEntity<String> postOrder(
	// 	@RequestPart("address") String address,
  //   @RequestPart("address") String address,

	// 	@RequestPart("description") String description, 

	// ) {

  //   Order


  // // public checkout(order: Order): Observable<Order> {
  // //   const formData = new FormData();
  // //   formData.set('address', order.address);
  // //   formData.set('cart', order.cart as any);
  // //   formData.set('comments', order.comments);
  // //   formData.set('name', order.name);
  // //   formData.set('priority', order.priority as any);
  // //   return this.http.post<Order>(`/api/Order`, formData);
  // // }
    
  //   // TODO Task 3
	 
	//  return null;
  // }
}
