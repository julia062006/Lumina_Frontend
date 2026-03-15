export default function Rodape() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <h3>LUMINA</h3>
                        <p>Ilumine sua leitura com nossa coleção digital premium. Descubra histórias que transformam.</p>
                    </div>

                    <div>
                        <h4 className="footer__section-title">Links Rápidos</h4>
                        <ul className="footer__links-list">
                            <li><a href="#" className="footer__link">Início</a></li>
                            <li><a href="#" className="footer__link">Biblioteca</a></li>
                            <li><a href="#" className="footer__link">Categorias</a></li>
                            <li><a href="#" className="footer__link">Autores</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer__section-title">Redes Sociais</h4>
                        <div className="footer__social-icons">
                            <a href="#" className="footer__social-icon">
                                <svg>...</svg>
                            </a>
                            <a href="#" className="footer__social-icon">

                                <svg>...</svg>
                            </a>
                            <a href="#" className="footer__social-icon">
                                <svg>...</svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <p>© 2026 LUMINA. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}