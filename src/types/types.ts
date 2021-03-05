export interface IUser {
    id: string,
    name: {
        first_name: string,
        last_name: string,
    },
    email: string,
    establishment: IEstablishment,
    join_date: Date,
}

export interface IEstablishment {
    id: string,
    name: string,
    domain: string,
    menu: Array<IProduct>,
    stripe_pk: string,
    timestamp: Date,
}

export interface IProduct {
    id: string,
    title: string,
    description: string,
    image: string,
    currency: string,
    price: number,
    timestamp: Date,
}

export interface ILineItem {
    product: IProduct,
    quantity: number,
}

export interface IOrder {
    id: string,
    payment_status: string,
    buyer: IUser,
    establishment: IEstablishment,
    products: Array<ILineItem>,
    price: number,
    currency: string,
    timestamp: Date,
}