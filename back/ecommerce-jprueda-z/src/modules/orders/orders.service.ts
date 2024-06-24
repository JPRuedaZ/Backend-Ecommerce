import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Order } from 'src/entities/Order.entity';
import { OrderDetail } from 'src/entities/OrderDetail.entity';
import { User } from 'src/entities/User.entity';
import { Product } from 'src/entities/Product.entity';


@Injectable()
export class OrdersService {
    
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private readonly ordersDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) {}
    async createOrder (userId: string, products: Partial<Product>[]) {
      let total = 0;
  
      // Busca el usuario en la base de datos usando el userId proporcionado
      const user = await this.usersRepository.findOneBy({ id: userId });
      if (!user) throw new Error('User not found');
  
      // Verifica que no haya productos duplicados en la lista de productos proporcionada
      const productIdSet = new Set(products.map(product => product.id));
      if (productIdSet.size !== products.length) {
          throw new BadRequestException('You cannot have duplicate products');
      }
  
      // Crea una nueva orden y la asocia con el usuario encontrado
      const order = new Order();
      order.user = user;
      order.date = new Date();
      
      // Guarda la orden en la base de datos
      const newOrder = await this.ordersRepository.save(order);
  
      // Itera sobre cada producto en la lista de productos proporcionada
      const productsArray = await Promise.all(products.map(async (elem) => {
          // Busca el producto en la base de datos y verifica que tenga stock disponible
          const product = await this.productsRepository.findOneBy({ id: elem.id, stock: MoreThan(0) });
          if (!product) throw new NotFoundException('Product not found');
          if (product.stock === 0) throw new NotFoundException('Product not available');
  
          // Suma el precio del producto al total de la orden
          total += Number(product.price);
  
          // Actualiza el stock del producto en la base de datos
          await this.productsRepository.update({ id: product.id }, { stock: product.stock - 1 });
          
          return product; 
      }));
  
      // Crea un nuevo detalle de la orden y lo asocia con los productos y la orden creada
      const orderDetail = new OrderDetail();
      orderDetail.price = Number(total.toFixed(2));
      orderDetail.products = productsArray;
      orderDetail.order = newOrder;
  
      // Guarda el detalle de la orden en la base de datos
      await this.ordersDetailsRepository.save(orderDetail);
  
      // Recupera la orden completa incluyendo las relaciones con usuario y detalles de la orden
      const finalOrder = await this.ordersRepository.findOne({
          where: { id: newOrder.id },
          relations: ['user', 'orderDetails']
      });
  
      // Elimina información sensible del usuario antes de devolver la orden final
      if (finalOrder && finalOrder.user) {
          delete finalOrder.user.password;
          delete finalOrder.user.isAdmin;
      }
      
      return finalOrder;
  };

    async getOrders(id: string): Promise<Order> {
        const order = this.ordersRepository.findOne( { where: { id: id }, relations: { user: true, orderDetails: true } } );
        if(!order) throw new NotFoundException('Order not found');
        const finalOrder = await this.ordersRepository.findOne({
            where: { id: id },
            relations: ['user', 'orderDetails']
          });
          
          if (finalOrder && finalOrder.user) {
            delete finalOrder.user.password;
            delete finalOrder.user.isAdmin;
          }
          
          return finalOrder;
    }
        
            
}
            
        
    

