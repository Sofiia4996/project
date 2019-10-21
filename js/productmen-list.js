class ProductmenList {
  constructor(productsmenUrl, renderContainer, cart) {
    this.cart = cart;
    fetch(productsmenUrl)
      .then(result => result.json())
      .then(productsmen => {
        this.productsmen = productsmen;
        this.renderProductsmen(renderContainer, productsmen);
        this.addEventListeners();
      });
  }
  getProductmenById(id) {
    return this.productsmen.find(el => el.id === id);
  }
  renderProductsmen(container, productsmen) {
    let productmenListDomString = '';
    productsmen.forEach(productmen => {
      productmenListDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${
                      productmen.image
                    }"
                        alt="${productmen.title}">
                    <div class="card-body">
                      <h4 class="card-title">${productmen.title}</h4>
                      <p class="card-text">${productmen.description}</p>
                      <button class="btn btn-dark info" data-toggle="modal"
                        data-target="#productInfoModal" data-id="${
                          productmen.id
                        }">Info
                      </button>
                      <button class="btn btn-dark buy" data-id="${
                        productmen.id
                      }">
                        $${productmen.price} - Buy
                      </button>
                    </div>
                  </div>
                </div>`;
    });
    container.html(productmenListDomString);
  }
  addEventListeners() {
    $('#productInfoModal').on('show.bs.modal', event => {
      const button = $(event.relatedTarget); // Button that triggered the modal
      const id = String(button.data('id')); // Extract info from data-* attributes
      const productmen = this.getProductmenById(id);
      const modal = $('#productInfoModal');
      modal
        .find('.modal-body .card-img-top')
        .attr('src', 'img/products/' + productmen.image)
        .attr('alt', productmen.title);
      modal.find('.modal-body .card-title').text(productmen.title);
      modal.find('.modal-body .card-text').text(productmen.description);
      modal
        .find('button.buy')
        .text(`${productmen.price} - Buy`)
        .data('id', id);
    });
    $('.card.product button.buy, #productInfoModal button.buy').click(event => {
      const button = $(event.target);
      const id = button.data('id');
      this.cart.addProductmen(id);
      window.showAlert('Product added to cart');
    });
  }
}