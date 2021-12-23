
import logger from "@shared/Logger";
import { Product } from "src/models/products.model";

// get the client
const mysql = require('mysql2/promise');
 
// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');
 
export abstract class databaseService {
 
  private static sqlConfig = {
    host: 'db4free.net',
    user: 'umysqldb',
    password: 'mysql@123',
    database: 'onlinestoredb'
  };
 



  public static async getAllProducts(params: string): Promise<Product[]> {
    var connection = await mysql.createConnection({
      ...this.sqlConfig,
      Promise: bluebird
    });
 
    let [rows, fields] = await connection.execute('SELECT * FROM products');
    let Products = rows.map((r: any) => {
      return <Product>r;
    })
    return Products;
  }


  public static async getProduct(id: number): Promise<number> {
    var connection = await mysql.createConnection({
      ...this.sqlConfig,
      Promise: bluebird
    });

    console.log(id)
   
    //let [rows] = await connection.execute(`select * FROM products WHERE id = ${id}`);
 
    let [rows, fields] = await connection.execute(`select * FROM products WHERE id = ${id}`);
    let Products = rows.map((r: any) => {
      return <Product>r;
    })
    return Products;
  }



  public static async deleteProduct(id: number): Promise<number> {
    var connection = await mysql.createConnection({
      ...this.sqlConfig,
      Promise: bluebird
    });
   
    let [rows] = await connection.execute(`DELETE FROM products WHERE id = ${id}`);
    console.log(rows.affectedRows)
    return rows.affectedRows;
  }

	
public static async addProduct(Product: Product): Promise<Product> {
    var connection = await mysql.createConnection({
      ...this.sqlConfig,
      Promise: bluebird
    });
    
   // let ts = Date.now();
    let d = new Date();
    let timestamp = d.getTime();
    console.log(timestamp);   

    let [rows] = await connection.execute(`
    INSERT INTO products
    ( title, 
      body_html,
      product_type,
      handle,
      status
      )
    VALUES ('${Product.title}', '${Product.body_html}', '${Product.product_type}', '${Product.handle}',  '${Product.status}')
    `);
    console.log(rows.affectedRows)
    return rows.affectedRows;
  }


  public static async updateProduct(product: Product): Promise<Product> {
    var connection = await mysql.createConnection({
      ...this.sqlConfig,
      Promise: bluebird
    });
    
    let ts = new Date();
    let [rows] = await connection.execute(`
    update  products
    set title = '${product.title}', body_html = '${product.body_html}' , product_type = '${product.product_type}', body_html = '${product.body_html}', handle = '${product.handle}', status = '${product.status}'  where id = ${product.id}`);
    console.log(rows.affectedRows)
    return rows.affectedRows;
  }

  
}

