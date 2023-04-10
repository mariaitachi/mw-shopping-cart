const url = "http://localhost:3000/api";
const _doc = document;
let productList = [];
let addedProduct = [];
const getAllProduct = () => {
  fetch(`${url}/products`)
    .then((res) => res.json())
    .then((res) => {
      const { data, success } = res;
      if (success) {
        productList = [...data];
        const innerEle = data.map((val) => {
          const { title, description, price, product_id, count } = val;
          return `<li class="offset-md-2 col-8 list-group-item">
                        <div class="row d-flex">
                            <h4 class="col-6">${title}</h4>
                            <div class="offset-md-3 col-3 d-flex">
                                <button type="button" class="btn btn-primary rounded-pill decrease-qty me-2" data-product="${product_id}" id="decreaseQty${product_id}" onclick="decreaseQty(\'`+ product_id +`\')"><b>-</b></button>
                                <input type="number" disabled id="qty${product_id}" value="0" class="form-control rounded-pill text-center" placeholder="QTY" />
                                <button type="button" class="btn btn-primary rounded-pill increase-qty ms-2" data-product="${product_id}" id="increaseQty${product_id}" onclick="increaseQty(\'`+ product_id +`\')">+</button>
                            </div>
                        </div>
                        <p class="col-12"><b>Description :</b>${description}</p>
                        <div class="row d-flex">
                          <lable class="col-6"><b>Price :</b>&#8377;${price}</lable>
                          <lable class="offset-md-3 col-3"><b>Available :</b> <span id="count${product_id}">${count}</span></lable>
                        </div>
                    </li>`;
        });
        const container = _doc.getElementById("productSection");
        container.innerHTML = `
            <ul class="list-group list-group-flush">
                ${innerEle.join("")}
            </div>`;
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const increaseQty = (id) => {
  const qty = _doc.getElementById(`qty${id}`);
  console.log(qty);
  const productDetail = _doc.getElementById(`increaseQty${id}`);
  const totalQty = Number(qty.value || 0) + 1;
  qty.value = totalQty;
  let fProduct = addedProduct.findIndex((val) => {
    return val.productId === productDetail.dataset.product;
  });
  const checkout = _doc.getElementById("checkoutBtn");
  if (fProduct < 0) {
    addedProduct.push({
      productId: productDetail.dataset.product,
      count: totalQty,
    });
  } else {
    addedProduct[fProduct].count = totalQty;
  }
  checkout.innerHTML = `CheckOut <span class="btn badge bg-secondary bg-gradient ms-1  mt-1 rounded-pill">${addedProduct.length}</span>`;
};

const decreaseQty = (id) => {
  const qty = _doc.getElementById(`qty${id}`);
  console.log(qty.value);
  const totalQty = qty.value < 1 ? 0 : Number(qty.value) - 1;
  qty.value = totalQty;
  const productDetail = _doc.getElementById(`decreaseQty${id}`);
  let fProduct = addedProduct.findIndex(
    (val) => val.productId === productDetail.dataset.product
  );
  const checkout = _doc.getElementById("checkoutBtn");
  if (fProduct >= 0 && totalQty > 0) {
    addedProduct[fProduct].count = totalQty;
    checkout.innerHTML = `CheckOut <span class="btn badge bg-secondary bg-gradient ms-1  mt-1 rounded-pill">${addedProduct.length}</span>`;
  } else if (fProduct >= 0 && totalQty === 0) {
    addedProduct.splice(fProduct, 1);
    checkout.innerHTML = addedProduct.length > 0 ? `CheckOut <span class="btn badge bg-secondary bg-gradient ms-1 mt-1 rounded-pill">${addedProduct.length}</span>` : `CheckOut`;
  }
};

const checkout = () => {
  if (addedProduct.length > 0) {
    const coupon = _doc.getElementById('coupon').value;
    console.log(addedProduct);
    const payload = {
      coupon,
      products: addedProduct
    };
    console.log(payload);
    fetch(`${url}/checkout`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => res.json()).then((res) => {
      console.log(res);
      if(res.success) {
        console.log(res.message);
        window.location.replace('/checkout');
      }
    })
  } else {
    console.log("Please select product to checkout.......");
  }
};