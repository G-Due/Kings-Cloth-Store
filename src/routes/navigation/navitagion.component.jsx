import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../logo.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { NavitationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles'

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  //console.log(currentUser);

  const signOutHandler = async () => {
    const res = await signOutUser();
  }

  return (
    <Fragment>

      <NavitationContainer>
        <LogoContainer to='/'>
          <Logo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>
            SHOP
            </NavLink>
          {currentUser ?
            (<NavLink as='span' onClick={signOutHandler}>Sign Out</NavLink>) :
            (<NavLink to='/auth'>
              SIGN IN
            </NavLink>)}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavitationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;