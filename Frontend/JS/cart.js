let realPanier = [];
let listOdonymie = ["Allée", "Anse", "Avenue", "Boulevard", "Carrefour", "Chaussée", "Chemin", "Cité", "Clos", "Côte", "Cours", "Degré", "Esplanade", "Gaffe", "Impasse", "Liason", "Mail", "Montée", "Passage", "Place" , "Placette", "Pont", "Promenade", "Quai", "Résidence", "Rang", "Rampe", "Rond-Point", "Route", "Rue", "Ruelle", "Sentier", "Square", "Traboule", "Traverse", "Venelle", "Villa", "Voie"];

(async function () {
    const produit = await apiCall(apiUrl , {});
    converstionLocalStorage(produit)
    afficherCart(realPanier);
})();

// FONCTION GET ITEM LOCALSTORAGE

async function converstionLocalStorage(produit) {
    for(let i = 0 ; i < produit.length; i++) {
        let a = JSON.parse(localStorage.getItem(produit[i]._id));
        if (a != null) {
            realPanier.push(a);
        }
    }
}
//FONCTION D'AFFICHAGE DU PANIER DYNAMIQUE

async function afficherCart (realPanier) {
    if(realPanier.length == 0) {
        let htmlError = `<div class="cart_section">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-10 offset-lg-1">
                                        <p class="text-center"> Il n'y a rien dans votre panier !<p>
                                        <img src="../../Backend/images/logo.PNG" alt="logo Orinoco">
                                        <a href="Index.html">Retour a la boutique</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("panier").innerHTML = htmlError;
    }
    else {
        let htmlList = [];
        let price = 0
        let quantity = 0
        let totalAmount = 0;
        
        function getTotalByProduct (quantite, price) {
            totalPrice = (quantite * price)
            totalAmount = totalAmount + totalPrice;
            return totalPrice;
        }

        for(let i = 0; i < realPanier.length; i++) {
            price = realPanier[i].price / 100;
            quantity = realPanier[i].quantity;
            htmlLi = `<li class="cart_item clearfix">
                            <div class="cart_item_image"><img src="${realPanier[i].imageUrl}" alt=""></div>
                            <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                <div class="cart_item_name cart_info_col">
                                    <div class="cart_item_title">Name</div>
                                    <div class="cart_item_text">${realPanier[i].name}</div>
                                </div>
                                <div class="cart_item_color cart_info_col">
                                    <div class="cart_item_title">Lentille</div>
                                    <div class="cart_item_text">${realPanier[i].lenses}</div>
                                </div>
                                <div class="cart_item_quantity cart_info_col">
                                    <div class="cart_item_title">Quantity</div>
                                    <input id="${realPanier[i]._id}" class="cart_item_text" type="number" value="${quantity}" max="${realPanier[i].stock}" onchange="inputOnChange(this, '${realPanier[i]._id}')" >
                                </div>
                                <div class="cart_item_price cart_info_col">
                                    <div class="cart_item_title">Price</div>
                                    <div class="cart_item_text">${price} €</div>
                                </div>
                                <div class="cart_item_total cart_info_col">
                                    <div class="cart_item_title">Total</div>
                                    <div class="cart_item_text">${getTotalByProduct(quantity,price)} €</div>
                                </div>
                            </div>
                        </li>`;
            htmlList.push(htmlLi)
        }
        let htmlCart =`<div class="cart_section">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-10 offset-lg-1">
                                        <div class="cart_container">
                                            <div class="cart_title">Shopping Cart</div>
                                            <div class="cart_items">
                                                <ul id="cart_list">
                                                </ul>
                                            </div>
                                            <div class="order_total">
                                                <div class="order_total_content text-md-right">
                                                    <div class="order_total_title">Order Total:</div>
                                                    <div class="order_total_amount">${totalAmount} €</div>
                                                </div>
                                            </div>
                                            <form id="form" class="mt-3"></form>
                                            <div class="cart_buttons">
                                                <a href="../Html/Index.html"><button type="button" class="button cart_button_clear">Continue Shopping</button></a>
                                                <a><button id="purchase" type="button" class="button cart_button_checkout" onclick="afficherForm()">Purchase</button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("panier").innerHTML = htmlCart;
        for( i = 0 ; i < htmlList.length; i++) {
            document.getElementById("cart_list").insertAdjacentHTML('beforeend', htmlList[i]);
        }
    }
}

async function afficherForm() {
    if(document.getElementById("paiment")) {

    }
    else {
        let blurDiv = '<div id="blur"></div>';
        let htmlForm = `<div class="d-flex justify-content-around">
                            <div class="col-5 p-2">
                                <div class="form-group">
                                    <label for="Contact">Contact</label>
                                    <input id="email" type="email" class="form-control" placeholder="Email" required>
                                    <input id="telephone" type="number" class="form-control" placeholder="Telephone">
                                    <small class="form-text text-muted">We'll never share your contact's informations with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="name">Destinataire</label>
                                    <input id="name" type="text" class="form-control" placeholder="Nom" required>
                                    <input id="prenom" type="text" class="form-control" placeholder="Prenom" required>
                                </div>
                                <div class="form-group">
                                    <label for="location">Adresse</label>
                                    <div class="d-flex">
                                        <input id="numeroRue" type="number" class="form-control" placeholder="n°" required>
                                        <select id="selectForm" name="streetType">
                                        </select>
                                    </div>
                                    <input id="adresse" type="text" class="form-control" placeholder="Adresse" required>
                                    <div class="d-flex">
                                        <input id="codePostal" type="text" class="form-control" placeholder="Code postal" required>
                                        <input id="ville" type="text" class="form-control" placeholder="Ville" required>
                                </div>
                                </div>
                            </div>
                            <div class="col-5 p-2">
                                <div class="payment-info" id="paiment">
                                        <div class="d-flex justify-content-between align-items-center"><span>Coordonnées Bancaires</span></div><span class="type d-block mt-3 mb-1">Card type</span>
                                        <label class="radio"> <input type="radio" name="card" value="payment" checked> <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>
                                        <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/visa.png" /></span> </label>
                                        <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span> </label>
                                        <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png" /></span> </label>               
                                </div>    
                                <div>
                                    <label class="credit-card-label">Nom sur la carte</label>
                                    <input id="nameCard" type="text" class="form-control credit-inputs" placeholder="Name" required>
                                </div>
                                <div>
                                    <label class="credit-card-label">Numéros de carte</label>
                                    <input id="numeroCard" type="text" class="form-control credit-inputs" placeholder="0000 0000 0000 0000" required>
                                </div>  
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="credit-card-label">Date</label>
                                        <input id="dateCard" type="text" class="form-control credit-inputs" placeholder="12/24" required>
                                    </div>
                                    <div class="col-md-6"id="purchaseButton>
                                        <label class="credit-card-label">CVV</label>
                                        <input id="securityCard" type="text" class="form-control credit-inputs" placeholder="342" required>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("form").insertAdjacentHTML('afterbegin', htmlForm);
        let purchaseButton = document.getElementById("purchase")
        purchaseButton.setAttribute("onclick", "purchaseCart()")
        let optionOdonymie = ''
        for(let i = 0; i < listOdonymie.length; i++) {
            optionOdonymie = optionOdonymie + `<option value="${listOdonymie[i]}">${listOdonymie[i]}</option>`;
            
    }
    document.getElementById("selectForm").innerHTML = optionOdonymie;
    }
}


async function inputOnChange(v, idProduct) {
    for(let i = 0 ; i < realPanier.length; i++) {
        if(realPanier[i].quantity > realPanier[i].stock) {
            alert("Nous n'avons pas assez de stock. Contactez le siege au 00.00.00.00.00");
            realPanier[i].quantity = 1;
            document.getElementById(idProduct).value = 1;
            let modifPanier = JSON.stringify(realPanier[i]);
            localStorage.setItem(idProduct, modifPanier);
        }
    }
    if(v.value <= 0) {
        localStorage.removeItem(idProduct);
        location.reload();
    }
    for(let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) == idProduct) {
            realPanier[i].quantity = v.value;
            let modifPanier = JSON.stringify(realPanier[i]);
            localStorage.setItem(idProduct, modifPanier);
        }  
    }
    afficherCart(realPanier);
}

async function purchaseCart() {

    let purchaseSend = [];
    let adresseForm = document.getElementById("numeroRue").value + " " + document.getElementById("selectForm").value + " " + document.getElementById("adresse").value;
    let cityForm = document.getElementById("codePostal").value + " " + document.getElementById("ville").value;
    console.log(adresseForm)
    let contact = {
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        lastName: document.getElementById("name").value,
        firstName: document.getElementById("prenom").value,
        adresse: adresseForm,
        city: cityForm,
      }; 
    
    let banking = {
        nameCard: document.getElementById("nameCard").value,
        numeroCard: document.getElementById("numeroCard").value,
        dateCard: document.getElementById("dateCard").value,
        securityCard: document.getElementById("securityCard").value,
    }
    JSON.stringify(contact)
    JSON.stringify(banking)
    JSON.stringify(realPanier)
    console.log(contact)
    console.log(banking)
    console.log(realPanier)
    purchaseSend.push(contact, banking, realPanier)
    console.log(purchaseSend)
    purchaseSend.push(banking + contact)
    let send = JSON.stringify(purchaseSend)
    console.log(send)

    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: purchaseSend
    })  
    .then(response => response.json())
    .then(data => {
        let OrderId = response.data;
        localStorage.setItem('orderId', JSON.stringify(OrderId));
        // window.location.replace("./confirmation.html");
    }) 
} 

async function formcheck() {
    const formvalueP = contact.firstName;
    const formvalueL = contact.lastName;
    const formvalueA = contact.address;
    const formvalueC = contact.city;
    const formvalueE = contact.email;
    if (
        /^[A-Za-z]{2,24}$/.test(formvalueP) 
        && /^[A-Za-z]{2,24}$/.test(formvalueL) 
        && /^[A-Za-z]{2,24}$/.test(formvalueC)
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formvalueE)
        && /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(formvalueA)) {
        return true;
    } 
    return false
}