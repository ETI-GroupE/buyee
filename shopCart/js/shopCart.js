//const userId = sessionStorage.getItem("userId");
const userId = 1;

const ShopCartID = 1;


async function setShopCartID() {
  const response = await fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/shoppingCartUser?UserID=' + userId);
  const data = await response.json();
  
  if (data == null) {
    const postResponse = await fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/shoppingCartUser?UserID=' + userId, {method: 'POST'});
    const postData = await postResponse.json();
    sessionStorage.setItem("ShopCartID", postData);
  } else {
    data.forEach(item => {
      sessionStorage.setItem("ShopCartID", item.shopCartID);
    });
  }
}

async function main() {
  await setShopCartID();
  const ShopCartID = sessionStorage.getItem("ShopCartID");
  console.log(ShopCartID);
}

main()

fetch('https://buyee-discount-qqglc24h2a-as.a.run.app/api/v1/discounts')
  .then(response => response.json())
  .then(data => {
    // handle the data here
    console.log(data)
    let dropdown = document.getElementById("myDropdown");
    dropdown.innerHTML = "";
     
    data.forEach(item => {
      let option = document.createElement("a");
      option.innerHTML = item.name;
      option.setAttribute("id", item.discountId);
      option.setAttribute("value", item.amount);
      option.setAttribute("onclick", "discountClick(this)");
      dropdown.appendChild(option);
    })
  })
  .catch(error => {
    console.error('Error:', error);
  });

function discountClick(data) {
  let option = document.getElementById("discountAmount");
  option.innerHTML = "Discount amount : -$" + data.getAttribute("value");
  let finalAmount = document.getElementById("FinalTotal");
  let calculateFinalAmt = (sessionStorage.getItem("subTotal")- data.getAttribute("value"))
  if (calculateFinalAmt < 0) {
    calculateFinalAmt = 0
  }
  sessionStorage.setItem("FinalTotal",calculateFinalAmt)
  sessionStorage.setItem("discountId",data.getAttribute("id"))
  finalAmount.innerHTML = "Final amount : $" + calculateFinalAmt;
};
  
finalSubTotal = 0;
fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/shoppingCart?ShopCartID=' + ShopCartID)
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {

    // handle the data here
    console.log(data);
    data.forEach(itemId => {
      fetch('https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products?product_id='+ itemId.productID)
        .then(response => response.json())
        .then(data => {
          let table = document.getElementById("shopping-cart-table");
          console.log(data)
          data.forEach(item => {
            // Create a new row element
            let row = table.insertRow();
      
            // Create cells for each item property
            let productImage = row.insertCell();
            let productName = row.insertCell();
            let price = row.insertCell();
            let quantity = row.insertCell();
            let subTotal = row.insertCell();

            // Set styles for each cell
            productImage.style.textAlign = "center";
            productName.style.textAlign = "center";
            price.style.textAlign = "center";
            quantity.style.textAlign = "center";
            subTotal.style.textAlign = "center";

            let formattedPrice = item.product_price.toFixed(2);
            let subTotalAmt = formattedPrice * itemId.quantity;
            finalSubTotal += subTotalAmt;
      
            // Populate the cells with item data
            productImage.innerHTML = "<img src='" + item.product_image_url + "'' text-align: center width='150' height='150'>";;
            productName.innerHTML = item.product_name;
            price.innerHTML = "$" + formattedPrice;
            quantity.innerHTML = itemId.quantity;
            subTotal.innerHTML = "$" + subTotalAmt.toFixed(2);
          });
          let subTotal = document.getElementById("SubTotal");
          subTotal.style = "margin-top: 40px; text-align: right; font-size: 20px; color: grey;";
          subTotal.innerHTML = "Sub Total : $"+ finalSubTotal.toFixed(2);

          let finalTotal = document.getElementById("FinalTotal");
          finalTotal.style = "margin-top: 10px; text-align: right; font-size: 25px; color: black;";
          finalTotal.innerHTML = "Sub Total : $"+ finalSubTotal.toFixed(2);
          
          
          sessionStorage.setItem("subTotal", finalSubTotal)
          sessionStorage.setItem("FinalTotal", finalSubTotal)
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    })
    .catch(error => {
    console.error('Error:', error);
  });



  const totalPayment = sessionStorage.getItem("FinalTotal");
  function checkout() {
    var emailAddress = document.getElementById("email").value;
    var shipping = document.getElementById("shipping").value;
    var postal = document.getElementById("postalCode").value;
    var creditCard = document.getElementById("creditCard").value;
    var finalTotal = document.getElementById("FinalTotal").innerText;

    let postalCode = parseInt(postal);
    let finalTotalAmt = parseFloat(totalPayment);

      const checkoutData = {
        "shopCartID": 1,
        "emailAddr": emailAddress,
        "shipping": shipping,
        "postalCode": postalCode,
        "creditCard": creditCard,
        "totalPayment": finalTotalAmt
      };
      
      
      fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/checkout?ShopCartID='+ ShopCartID)
      .then(response => response.json())
      .then(data => {
        // handle the data here
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      console.log(JSON.stringify(checkoutData))

      fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          checkoutData
        )
      })
      .then(response => {
        console.log(response.status)
        if (response.ok) {
            //add decrease value
            reduceProduct()
            sendDiscountID()
            window.location.href = "/shopCart/orderCompletetion.html"
          return ;
        } 
        else if(response.status == 400) {
          // Get the snackbar DIV
          var x = document.getElementById("snackbar");
        
          // Add the "show" class to DIV
          x.className = "show";
        
          // After 3 seconds, remove the show class from DIV
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
          return;
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        console.log("made it");
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }

function reduceProduct(){
  fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/shoppingCart?ShopCartID='+ ShopCartID)
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {
    // handle the data here
    console.log(data);
    data.forEach(itemId => {
      fetch('https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/product/product_stock/decrement/'+ itemId.productID +'?by=' + itemId.quantity,{method: 'POST'})
        .then(response => {
          console.log(response.status);
          return ;
        })
    })
  });
}
function sendDiscountID(){
  fetch('https://buyee-discount-qqglc24h2a-as.a.run.app/api/v1/discountapply/'+ShopCartID+"/"+sessionStorage.getItem("discountId"), {method: 'POST'})
  .then(response => {
    console.log(response.status);
    return ;
  })
  .then(data => {
    console.log(data)
  })

}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}