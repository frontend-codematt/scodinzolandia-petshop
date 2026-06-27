// Scodinzolandia — dati prodotti + carrello condiviso (localStorage)
export const PRODUCTS = [
  { id:1,  name:'Crocchette Grain-Free Pollo 12kg',     brand:'NaturalPet',   cat:'cane',  category:'Cibo secco', price:54.90, oldPrice:64.90, reviews:412, rating:5, img:'https://placedog.net/700/700?id=1',  desc:'Crocchette monoproteiche al pollo fresco, senza cereali. Ideali per cani adulti di taglia media e grande con digestione sensibile.' },
  { id:2,  name:'Crocchette Salmone & Riso 3kg',         brand:'NaturalPet',   cat:'cane',  category:'Cibo secco', price:22.90, oldPrice:null,  reviews:187, rating:5, img:'https://placedog.net/700/700?id=2',  desc:'Ricetta leggera al salmone e riso, ricca di Omega-3 per un pelo lucido e una pelle sana.' },
  { id:3,  name:'Snack Dentali Natural 6 pz',            brand:'DentaDog',     cat:'cane',  category:'Snack',      price:6.90,  oldPrice:null,  reviews:534, rating:5, img:'https://placedog.net/700/700?id=3',  desc:'Bastoncini dentali che aiutano a ridurre tartaro e alito cattivo. Senza zuccheri aggiunti.' },
  { id:4,  name:'Gioco Corda Intrecciata Resistente',    brand:'PlayPaws',     cat:'cane',  category:'Giochi',     price:9.90,  oldPrice:null,  reviews:367, rating:4, img:'https://placedog.net/700/700?id=5',  desc:'Corda in cotone naturale intrecciato, perfetta per il gioco del tira-e-molla e per la pulizia dei denti.' },
  { id:5,  name:'Cuccia Memory Foam Comfort M',          brand:'DreamDog',     cat:'cane',  category:'Cucce',      price:74.90, oldPrice:89.90, reviews:98,  rating:5, img:'https://placedog.net/700/700?id=6',  desc:'Materasso ortopedico in memory foam con fodera sfoderabile e lavabile. Sostiene le articolazioni.' },
  { id:6,  name:'Pettorina Regolabile Antistrappo',      brand:'WalkEasy',     cat:'cane',  category:'Accessori',  price:29.90, oldPrice:null,  reviews:142, rating:4, img:'https://placedog.net/700/700?id=7',  desc:'Pettorina imbottita con doppia regolazione e fascia riflettente per le passeggiate serali.' },
  { id:7,  name:'Patè Tonno & Salmone 24×85g',           brand:'GattoGourmet', cat:'gatto', category:'Cibo umido', price:23.90, oldPrice:null,  reviews:289, rating:5, img:'https://cataas.com/cat?width=700&height=700&n=7',  desc:'Multipack di patè ricchi di pesce fresco, completi e bilanciati per gatti adulti.' },
  { id:8,  name:'Croccantini Pollo Indoor 2kg',          brand:'FelixPro',     cat:'gatto', category:'Cibo secco', price:14.90, oldPrice:17.90, reviews:220, rating:4, img:'https://cataas.com/cat?width=700&height=700&n=8',  desc:'Formula specifica per gatti che vivono in casa: controllo del peso e delle palle di pelo.' },
  { id:9,  name:'Tiragraffi Torre Deluxe 120cm',         brand:'CatTower',     cat:'gatto', category:'Cucce',      price:39.90, oldPrice:null,  reviews:156, rating:5, img:'https://cataas.com/cat?width=700&height=700&n=9',  desc:'Tiragraffi a più livelli con cuccia, piattaforme e pendaglio gioco. Base stabile antiribaltamento.' },
  { id:10, name:'Lettiera Agglomerante Profumata 10L',   brand:'PuroGatto',    cat:'gatto', category:'Igiene',     price:12.90, oldPrice:15.90, reviews:201, rating:4, img:'https://cataas.com/cat?width=700&height=700&n=10', desc:'Argilla naturale ad altissimo potere agglomerante, abbatte gli odori fino a 14 giorni.' },
  { id:11, name:'Topini Catnip Set da 4',                brand:'PlayPaws',     cat:'gatto', category:'Giochi',     price:7.90,  oldPrice:null,  reviews:445, rating:5, img:'https://cataas.com/cat?width=700&height=700&n=11', desc:'Set di topini in feltro con erba gatta naturale, stimolano il gioco e l\u2019istinto predatorio.' },
  { id:12, name:'Spazzola Toelettatura Anti-Pelo',       brand:'SoftCare',     cat:'gatto', category:'Igiene',     price:11.90, oldPrice:null,  reviews:173, rating:4, img:'https://cataas.com/cat?width=700&height=700&n=12', desc:'Spazzola con setole retrattili che rimuove il sottopelo in eccesso senza tirare.' },
];

export const fmt = n => n.toFixed(2).replace('.', ',') + '\u00a0€';
export const byId = id => PRODUCTS.find(p => p.id === Number(id));

const KEY = 'scod_cart_v1';
export function rawCart() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
function save(o) { localStorage.setItem(KEY, JSON.stringify(o)); window.dispatchEvent(new CustomEvent('scod-cart')); }
export function addToCart(id, q = 1) { const c = rawCart(); c[id] = (c[id] || 0) + q; save(c); }
export function setQty(id, q) { const c = rawCart(); if (q <= 0) delete c[id]; else c[id] = q; save(c); }
export function removeItem(id) { const c = rawCart(); delete c[id]; save(c); }
export function clearCart() { save({}); }
export function cartCount() { return Object.values(rawCart()).reduce((a, b) => a + b, 0); }
export function cartItems() { const c = rawCart(); return PRODUCTS.filter(p => c[p.id]).map(p => ({ ...p, qty: c[p.id] })); }
export function subtotal() { return cartItems().reduce((a, p) => a + p.price * p.qty, 0); }
export function onChange(cb) {
  window.addEventListener('scod-cart', cb);
  window.addEventListener('storage', cb);
  return () => { window.removeEventListener('scod-cart', cb); window.removeEventListener('storage', cb); };
}
