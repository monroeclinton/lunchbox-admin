import React, {useState} from "react";
import {Row, Col, Button, Alert} from "antd";

import layoutStyles from "../../../styles/layout.scss";
import formStyles from "../../../styles/form.scss";

import DashboardContainer from "../../components/container/dashboard/DashboardContainer";
import NewProduct from "../../components/dashboard/menu/NewProduct";
import Product from "../../components/dashboard/menu/Product";

import {useAuthState} from "../../context/auth/reducer";

function Menu(): JSX.Element {

    const [newProduct, setNewProduct] = useState(false);

    const authState = useAuthState();

    const handleNewProduct = (): void => {
        setNewProduct(!newProduct);
    }

    return (
        <DashboardContainer>
            <Row gutter={24} className={layoutStyles.mB1}>
                <Col>
                    <h1>MENU ITEMS</h1>
                </Col>
                {
                    !newProduct &&
                    <Col className={layoutStyles.flex + ' ' + layoutStyles.alignCenter}>
                        <Button type="primary" className={formStyles.button + ' ' + formStyles.primary} onClick={handleNewProduct}>
                            New
                        </Button>
                    </Col>
                }
            </Row>
            {
                newProduct &&
                <NewProduct handleNewProduct={handleNewProduct} />
            }
            <div className={layoutStyles.flex + ' ' + layoutStyles.flexColumn}>
                <div className={layoutStyles.mB1}>
                    {
                        (authState.user?.establishment.menu &&
                        authState.user?.establishment.menu.length > 0) &&
                        authState.user?.establishment.menu.map(product => <Product key={product.id} product={product} />).reverse()
                    }
                    {
                        authState.user?.establishment.menu.length === 0 &&
                        <Alert message={"There are no products here."} style={{maxWidth: "650px"}} />
                    }
                </div>
            </div>
        </DashboardContainer>
    );
}

export default Menu;
export const MENU_URL = "/menu";