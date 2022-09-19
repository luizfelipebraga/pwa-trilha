import { ContactLink } from '@magento/venia-ui/lib/components/ContactPage/index';

const accountLinks = new Map()
    .set('CATEGORIAS', null)
    .set('Pecas', '/pecas.html')
    .set('Servicos', '/servicos.html')
    .set('Manutencao', '/manutencao.html')
    .set('Sistemas de Trocas', '/sistemas-de-trocas.html');

const aboutLinks = new Map()
    .set('INSTITUCIONAL', '/about-us')
    .set('Quem Somos', '/customer-service')
    .set('Nossa Historia', '/customer-service')
    .set('Trabalhe Conosco', '/customer-service');

const helpLinks = new Map()
    .set('AJUDA ', null)
    .set('Politica de Privacidade', '/customer-service')
    .set('Politica de Troca', '/customer-service')
    .set('Termos e Condicoes', '/customer-service')
    .set('FAQ', '/customer-service')
    .set('Fale Conosco', '/customer-service')
    // .set('Contact Us', {
    //     path: '/contact-us',
    //     Component: ContactLink
    // })

export const DEFAULT_LINKS = new Map()
    .set('account', accountLinks)
    .set('about', aboutLinks)
    .set('help', helpLinks);

export const LOREM_IPSUM =
    'Lorem ipsum dolor sit amet, consectetur adipsicing elit, sed do eiusmod tempor incididunt ut labore et dolore.';
