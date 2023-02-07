
window.onload = function() {
    
    function getAllorders(){
        const fetchOrders = () => {
            axios.get("https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/allpurchase")
            .then((response) => {
              console.log(response);
              const orders = response.data;
          
              return Promise.all(orders.map(order => {
                var content = document.getElementById("rowOrder");
                appendContent = `<div class = 'col-md-3 eachOrder card border-danger'>
                  <img src="" class='prodimg'> 
                  <div class='prodnm '></div> 
                  <div>Order Id:  ${order.order_id}</div>
                  <div class="prodid">Product Id:  ${order.product_id}</div>
                  <label for="status"><b>Delivery status:<b></label>
                  <div id=${order.order_id}>
                    <select name="status" id=${order.product_id} form="statusform">
                      <option value=1>Order Placed</option>
                      <option value=2 >Preparing to ship from ship location</option>
                      <option value=3>In transit to destination</option>
                      <option value=4>Arrived in destination</option>
                      <option value=5>Delivered</option>
                    </select>
                  </div>
                </div>`;
                content.innerHTML += appendContent;
                changeDeliveryStatus();  
                return axios.get(`https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products?product_id=${order.product_id}`);
              }));
            })
            .then((responses) => {
              console.log(responses);
              for (var i = 0; i < responses.length; i++){
                var productDt = responses[i].data[0];
                document.getElementsByClassName("prodnm")[i].innerHTML = productDt.product_name;
                document.getElementsByTagName("img")[i].src = productDt.product_image_url;
                

              }
            })
            .catch((error) => console.error(error));
        };
    
        fetchOrders();
        
        
    
    }

    getAllorders();
    
};

addPurchHist();

function addPurchHist(){
    axios.get("https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/allpurchase")
            .then((response) => {
                console.log(response,typeof response);
               const orders = response.data;
               console.log(typeof JSON.stringify(orders));
               return axios.post("https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status",orders);
               


            })
            .then((response)=>{

                console.log(response);

            })
            .catch((error) => {
                console.error(error);
              });
}


/*function getStatusName(statId){
    if (statId == 1){
        var statusName = "Order Placed"
   }
   else if (statId == 2){
       var statusName = "Preparing to ship from ship location"
  }
  else if (statId == 3){
   var statusName = "In transit to destination"
  }
  else if (statId == 4){
   var statusName = "Arrived in desination"
  } 
   else{
       var statusName = "Delivered"
  }

  return statusName

}*/
    
function getSelectValue(){
  


}


    
function changeDeliveryStatus(){
     var selects = document.querySelectorAll("select");
     for (var i = 0; i < selects.length; i++) {
        selects[i].addEventListener("change",function(){
            var selectedOption = this.options[this.selectedIndex].value;
            var productid = this.id;
            var orderid = this.parentNode.id;
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", "https://buyee-delivery-qqglc24h2a-as.a.run.app/api/v1/status" +"/"+ orderid + "/" + productid + "/" + selectedOption, true);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                return xhr.status;
              }else{
                return xhr.status;
              }
            };
            xhr.send();
    
    
         });
    

    }
    
}







//changeDeliveryStatus();
