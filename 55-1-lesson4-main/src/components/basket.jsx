import {useEffect} from 'react'
import {Offcanvas, Button} from 'react-bootstrap'
import {useBasket} from '../store/use-basket'
import {Trash2} from 'lucide-react'

export function Basket({show, handleClose, ...props}) {
    const {list, isLoading, error, fetchBasket, removeFromBasket} = useBasket()

    useEffect(() => {
        if (show) {
            fetchBasket()
        }
    }, [show, fetchBasket])

    return (
        <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Корзина</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {isLoading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {!isLoading && !error && list.length === 0 && <div>Корзина пуста</div>}

                {!isLoading && !error && list.map((item) => (
                    <div key={item.id} className='d-flex align-items-center justify-content-between border-bottom py-2'>
                        <div className='d-flex align-items-center gap-2'>
                            {item.picture && (
                                <img
                                    src={item.picture}
                                    alt={item.name}
                                    style={{width: 48, height: 48, objectFit: 'cover'}}
                                />
                            )}
                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                            </div>
                        </div>
                        <Button
                            variant='outline-danger'
                            size='sm'
                            onClick={() => removeFromBasket(item.id)}
                            aria-label='Удалить из корзины'
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Basket
