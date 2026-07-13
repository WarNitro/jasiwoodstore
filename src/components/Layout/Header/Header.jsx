//import styles from './Header.module.css'

function Header() {

    return (
        <header className="d-none d-md-block text-center bg-body-tertiary m-0 p-3" style={{ height: "450px", backgroundImage: "url(/jasiwoodstore/img/logo.png), url(/jasiwoodstore/img/logo_bg.png)", backgroundRepeat: "no-repeat, repeat-x", backgroundSize: "50%, contain", backgroundPosition: "center" }}>
            <h1 className="invisible">Pasteles Jasiwood</h1>
        </header>
    )
}

export default Header
