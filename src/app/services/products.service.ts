import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IProduct, SortOption, SortOrder } from "../models/product";
import { Observable } from "rxjs";

/**
 * Сервис для работы с продуктами.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  urlProducts: string = `https://fakestoreapi.com/products`;

  constructor(private http: HttpClient) { }

  /**
   * Получает список продуктов.
   * @returns Возвращает Observable с массивом продуктов.
   */
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.urlProducts}`)
  }

  /**
   * Получает продукт по его идентификатору.
   * @param id Идентификатор продукта.
   * @returns Возвращает Observable с объектом продукта.
   */
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.urlProducts}/${id}`);
  }

  /**
   * Получение списка категорий товаров из API.
   * @returns массив строк - названия категорий товаров.
   */
  getCategoriesByProducts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlProducts}/categories`);
  }

  /**
   * Получает список продуктов по категории.
   * @param category Название категории продукта.
   * @returns Возвращает Observable с массивом продуктов.
   */
  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.urlProducts}/category/${category}`);
  }

  /**
   * Сортирует список продуктов по заданным параметрам сортировки.
   * @param products Массив продуктов для сортировки.
   * @param sortOption Параметр сортировки (название, цена, категория, рейтинг, id).
   * @param sortOrder Порядок сортировки (по возрастанию или убыванию).
   * @returns Возвращает отсортированный массив продуктов.
   */
  sortByProducts(products: IProduct[], sortOption: SortOption, sortOrder: SortOrder): IProduct[]{
    const sortingOptions: { [key: string]: (a: IProduct, b: IProduct) => number; } = {
      'title': (a:IProduct, b: IProduct) => a.title.localeCompare(b.title),
      'price': (a:IProduct, b: IProduct) => a.price - b.price,
      'category': (a:IProduct, b: IProduct) => a.category.localeCompare(b.category),
      'rating': (a:IProduct, b: IProduct) => a.rating.rate - b.rating.rate,
      'id': (a:IProduct, b: IProduct) => a.id - b.id,
    };

    const sortFunction = sortingOptions[sortOption];
    return products.sort((a, b) => sortOrder === "asc"
      ? sortFunction(a, b)
      : sortFunction(b, a));
  }
}
