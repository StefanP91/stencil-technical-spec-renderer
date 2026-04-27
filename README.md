# BigCommerce Product Technical Specs Renderer

A modular solution for dynamically displaying technical specifications on BigCommerce product pages using **GraphQL**, **Metafields**, and the **Stencil Framework**. This project allows you to organize specs into custom groups (e.g., Display, Processor, Battery) and render them in a clean, responsive table.

---

## 🚀 How It Works

1. **Metafields**: Data is stored in a metafield with the key `technical_specs` under the namespace `Technical Data`.
2. **GraphQL**: Data is fetched via a GraphQL query in the Page Frontmatter of `product.html`, ensuring high performance.
3. **JavaScript Renderer**: A modular JS script parses the JSON object and dynamically builds the HTML table in the DOM.

---

## 🛠 Setup & Implementation

### 1. Frontmatter (product.html)
Add the following GraphQL query to the very top of your `product.html` file:

```handlebars
---
product:
    gql: "query {
        site {
            product (entityId: {{product.id}}) {
                metafields(namespace: \"Technical Data\", keys: [\"technical_specs\"]) {
                    edges {
                        node {
                            id
                            key
                            value
                        }
                    }
                }
            }
        }
    }"
---
