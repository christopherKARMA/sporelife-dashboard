// ============================================
// PLAN D'ACTION COMPLET - 60 JOURS
// "BOOST TON MOOD" - Ice Tea Pêche-Mangue aux Champignons
// ============================================

export interface Task {
  id: string
  title: string
  description: string | null
  category: 'product' | 'supplier' | 'content' | 'admin' | 'marketing' | 'legal'
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  day: number
  assignee: 'chris' | 'lucas' | 'both'
  isVideo?: boolean
}

// Date de début du challenge (configurable)
export const CHALLENGE_START_DATE = '2026-02-10' // Format YYYY-MM-DD

export const tasks: Task[] = [
  // ========== SEMAINE 1 : TEASING & CONCEPT (J1-7) ==========
  
  // Jour 1 - Teasing
  { id: '1', title: '🎬 VIDÉO: "On lance un nouveau produit..."', description: 'Teaser mystère - ne pas révéler le produit, juste l\'excitation du lancement', category: 'content', status: 'todo', priority: 'high', day: 1, assignee: 'chris', isVideo: true },
  { id: '2', title: 'Brainstorm final concept Boost ton Mood', description: 'Valider: Ice tea pêche-mangue, 4 champignons (Lion\'s Mane, Cordyceps, Reishi, Chaga)', category: 'product', status: 'todo', priority: 'high', day: 1, assignee: 'both' },
  { id: '3', title: 'Setup compte TikTok @sporelife', description: 'Créer/optimiser le compte, bio, photo de profil', category: 'content', status: 'todo', priority: 'high', day: 1, assignee: 'chris' },
  
  // Jour 2 - Présentation concept
  { id: '4', title: '🎬 VIDÉO: "L\'eau mais en mieux - le concept"', description: 'Présenter l\'idée sans tout révéler: boisson fonctionnelle, goût incroyable, bienfaits', category: 'content', status: 'todo', priority: 'high', day: 2, assignee: 'chris', isVideo: true },
  { id: '5', title: 'Définir formulation cible', description: 'Dosages par sachet: Lion\'s Mane 500mg, Cordyceps 300mg, Reishi 200mg, Chaga 200mg', category: 'product', status: 'todo', priority: 'high', day: 2, assignee: 'lucas' },
  { id: '6', title: 'Recherche positionnement prix', description: 'Analyser concurrence (Mud/Wtr, Ryze, etc.) - cible 1.50-2€/sachet', category: 'product', status: 'todo', priority: 'medium', day: 2, assignee: 'lucas' },
  
  // Jour 3 - Teasing suite
  { id: '7', title: '🎬 VIDÉO: "Pourquoi les champignons?"', description: 'Éducation légère sur les bienfaits des champignons adaptogènes', category: 'content', status: 'todo', priority: 'high', day: 3, assignee: 'chris', isVideo: true },
  { id: '8', title: '🎬 VIDÉO: "Story time - comment on a eu l\'idée"', description: 'Raconter l\'origine du projet, rendre humain', category: 'content', status: 'todo', priority: 'medium', day: 3, assignee: 'chris', isVideo: true },
  { id: '9', title: 'Créer brief visuel de la marque', description: 'Moodboard, couleurs (pêche/mangue), typo, style', category: 'product', status: 'todo', priority: 'medium', day: 3, assignee: 'chris' },
  
  // Jour 4 - Recherche fournisseurs poudres
  { id: '10', title: '🎬 VIDÉO: "J4 - On cherche nos fournisseurs"', description: 'Montrer la recherche en temps réel, les galères', category: 'content', status: 'todo', priority: 'high', day: 4, assignee: 'chris', isVideo: true },
  { id: '11', title: 'Lister 20 fournisseurs poudres champignons', description: 'Europe + Asie - extraits bio certifiés', category: 'supplier', status: 'todo', priority: 'high', day: 4, assignee: 'lucas' },
  { id: '12', title: 'Créer template email demande devis', description: 'Email pro: présentation, besoins, MOQ, prix', category: 'supplier', status: 'todo', priority: 'medium', day: 4, assignee: 'lucas' },
  
  // Jour 5 - Contact fournisseurs
  { id: '13', title: 'Envoyer 10 emails fournisseurs poudres', description: 'Demander devis + échantillons Lion\'s Mane, Cordyceps, Reishi, Chaga', category: 'supplier', status: 'todo', priority: 'high', day: 5, assignee: 'lucas' },
  { id: '14', title: '🎬 VIDÉO: "On a contacté 10 fournisseurs"', description: 'Montrer les emails envoyés, expliquer le process', category: 'content', status: 'todo', priority: 'high', day: 5, assignee: 'chris', isVideo: true },
  { id: '15', title: 'Recherche fournisseurs arômes pêche-mangue', description: 'Arômes naturels compatibles poudre soluble', category: 'supplier', status: 'todo', priority: 'medium', day: 5, assignee: 'lucas' },
  
  // Jour 6 - Recherche packaging
  { id: '16', title: 'Lister 10 fournisseurs packaging sachets', description: 'Sachets stick individuels, doypack, impression perso', category: 'supplier', status: 'todo', priority: 'high', day: 6, assignee: 'lucas' },
  { id: '17', title: '🎬 VIDÉO: "Sachets vs Pots - notre choix"', description: 'Expliquer pourquoi format sachet individuel', category: 'content', status: 'todo', priority: 'medium', day: 6, assignee: 'chris', isVideo: true },
  { id: '18', title: 'Contacter 5 fournisseurs packaging', description: 'Demander devis sachets 10g personnalisés', category: 'supplier', status: 'todo', priority: 'high', day: 6, assignee: 'lucas' },
  
  // Jour 7 - Bilan S1
  { id: '19', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 1"', description: 'Récap: concept validé, fournisseurs contactés, premiers retours', category: 'content', status: 'todo', priority: 'high', day: 7, assignee: 'chris', isVideo: true },
  { id: '20', title: 'Analyser premiers retours fournisseurs', description: 'Comparer prix, MOQ, qualité, délais', category: 'supplier', status: 'todo', priority: 'high', day: 7, assignee: 'lucas' },
  { id: '21', title: 'Relancer fournisseurs sans réponse', description: 'Email de relance + LinkedIn', category: 'supplier', status: 'todo', priority: 'medium', day: 7, assignee: 'lucas' },

  // ========== SEMAINE 2 : SÉLECTION & TESTS (J8-14) ==========
  
  // Jour 8
  { id: '22', title: 'Tableau comparatif fournisseurs poudres', description: 'Excel: prix/kg, MOQ, certifs, délais, qualité', category: 'supplier', status: 'todo', priority: 'high', day: 8, assignee: 'lucas' },
  { id: '23', title: '🎬 VIDÉO: "Les prix des fournisseurs (choquant)"', description: 'Réaction aux devis, transparence sur les coûts', category: 'content', status: 'todo', priority: 'high', day: 8, assignee: 'chris', isVideo: true },
  { id: '24', title: 'Short-lister 3 fournisseurs poudres', description: 'Sélectionner les 3 meilleurs pour échantillons', category: 'supplier', status: 'todo', priority: 'high', day: 8, assignee: 'lucas' },
  
  // Jour 9
  { id: '25', title: 'Commander échantillons poudres (3 fournisseurs)', description: 'Payer et tracker les échantillons', category: 'supplier', status: 'todo', priority: 'high', day: 9, assignee: 'lucas' },
  { id: '26', title: '🎬 VIDÉO: "On commande nos premiers échantillons!"', description: 'Montrer la commande, l\'excitation', category: 'content', status: 'todo', priority: 'high', day: 9, assignee: 'chris', isVideo: true },
  { id: '27', title: 'Négocier prix avec fournisseurs packaging', description: 'Demander remises volume, MOQ réduit', category: 'supplier', status: 'todo', priority: 'medium', day: 9, assignee: 'lucas' },
  
  // Jour 10
  { id: '28', title: 'Commander échantillons packaging', description: 'Sachets test des 2 meilleurs fournisseurs', category: 'supplier', status: 'todo', priority: 'high', day: 10, assignee: 'lucas' },
  { id: '29', title: '🎬 VIDÉO: "Lion\'s Mane - le champignon du focus 🧠"', description: 'Contenu éducatif: bienfaits, études, dosage', category: 'content', status: 'todo', priority: 'medium', day: 10, assignee: 'chris', isVideo: true },
  { id: '30', title: 'Recherche réglementation compléments CH/FR', description: 'Règles étiquetage, allégations autorisées', category: 'legal', status: 'todo', priority: 'high', day: 10, assignee: 'lucas' },
  
  // Jour 11
  { id: '31', title: '🎬 VIDÉO: "Cordyceps - l\'énergie des athlètes ⚡"', description: 'Contenu éducatif: bienfaits, études, dosage', category: 'content', status: 'todo', priority: 'medium', day: 11, assignee: 'chris', isVideo: true },
  { id: '32', title: 'Créer maquette design packaging V1', description: 'Première version design sachet Boost ton Mood', category: 'product', status: 'todo', priority: 'high', day: 11, assignee: 'chris' },
  { id: '33', title: 'Contacter aromaticiens pour échantillons', description: 'Arôme pêche-mangue naturel', category: 'supplier', status: 'todo', priority: 'high', day: 11, assignee: 'lucas' },
  
  // Jour 12
  { id: '34', title: 'Réception échantillons poudres (estimé)', description: 'Vérifier qualité, texture, couleur', category: 'supplier', status: 'todo', priority: 'high', day: 12, assignee: 'lucas' },
  { id: '35', title: '🎬 VIDÉO: "📦 Les poudres sont arrivées - UNBOXING"', description: 'Ouvrir les colis, réaction au produit brut', category: 'content', status: 'todo', priority: 'high', day: 12, assignee: 'chris', isVideo: true },
  { id: '36', title: 'Test dégustation poudres brutes', description: 'Goûter chaque champignon seul, noter', category: 'product', status: 'todo', priority: 'medium', day: 12, assignee: 'both' },
  
  // Jour 13
  { id: '37', title: '🎬 VIDÉO: "On goûte les champignons crus 😬"', description: 'Réaction honnête au goût, humour', category: 'content', status: 'todo', priority: 'high', day: 13, assignee: 'chris', isVideo: true },
  { id: '38', title: 'Choisir fournisseur poudres final', description: 'Décision basée sur qualité/prix/délai', category: 'supplier', status: 'todo', priority: 'high', day: 13, assignee: 'lucas' },
  { id: '39', title: 'Premier test mélange maison', description: 'Mélanger les 4 poudres + arôme test', category: 'product', status: 'todo', priority: 'high', day: 13, assignee: 'both' },
  
  // Jour 14 - Bilan S2
  { id: '40', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 2"', description: 'Échantillons reçus, tests en cours, fournisseurs choisis', category: 'content', status: 'todo', priority: 'high', day: 14, assignee: 'chris', isVideo: true },
  { id: '41', title: 'Réception échantillons packaging', description: 'Tester qualité sachets, zip, étanchéité', category: 'supplier', status: 'todo', priority: 'high', day: 14, assignee: 'lucas' },
  { id: '42', title: 'Choisir fournisseur packaging final', description: 'Décision basée sur qualité/prix/MOQ', category: 'supplier', status: 'todo', priority: 'high', day: 14, assignee: 'lucas' },

  // ========== SEMAINE 3 : FORMULATION & SHOPIFY (J15-21) ==========
  
  // Jour 15
  { id: '43', title: '🎬 VIDÉO: "On crée LA recette parfaite"', description: 'Montrer les tests de dosage, le process', category: 'content', status: 'todo', priority: 'high', day: 15, assignee: 'chris', isVideo: true },
  { id: '44', title: 'Tests formulation: 5 versions différentes', description: 'Varier les dosages, tester la solubilité', category: 'product', status: 'todo', priority: 'high', day: 15, assignee: 'lucas' },
  { id: '45', title: 'Test arôme pêche-mangue', description: 'Tester différentes concentrations', category: 'product', status: 'todo', priority: 'high', day: 15, assignee: 'lucas' },
  
  // Jour 16
  { id: '46', title: 'Créer boutique Shopify (structure)', description: 'Setup compte, thème, pages de base', category: 'marketing', status: 'todo', priority: 'high', day: 16, assignee: 'chris' },
  { id: '47', title: '🎬 VIDÉO: "Reishi - le champignon zen 😴"', description: 'Contenu éducatif: sommeil, relaxation', category: 'content', status: 'todo', priority: 'medium', day: 16, assignee: 'chris', isVideo: true },
  { id: '48', title: 'Finaliser recette après tests', description: 'Valider dosages finaux, goût optimal', category: 'product', status: 'todo', priority: 'high', day: 16, assignee: 'lucas' },
  
  // Jour 17
  { id: '49', title: '🎬 VIDÉO: "On crée notre SITE - Behind the scenes"', description: 'Montrer la création Shopify en accéléré', category: 'content', status: 'todo', priority: 'high', day: 17, assignee: 'chris', isVideo: true },
  { id: '50', title: 'Créer fiches produits Shopify', description: 'Descriptions, prix, variants', category: 'marketing', status: 'todo', priority: 'high', day: 17, assignee: 'chris' },
  { id: '51', title: 'Shooting photos produit (mockups)', description: 'Photos 3D/mockups du packaging', category: 'marketing', status: 'todo', priority: 'medium', day: 17, assignee: 'chris' },
  
  // Jour 18
  { id: '52', title: 'Passer commande poudres (lot production)', description: 'Commander 5-10kg de chaque champignon', category: 'supplier', status: 'todo', priority: 'high', day: 18, assignee: 'lucas' },
  { id: '53', title: 'Passer commande packaging', description: 'Commander 1000 sachets personnalisés', category: 'supplier', status: 'todo', priority: 'high', day: 18, assignee: 'lucas' },
  { id: '54', title: '🎬 VIDÉO: "💰 On passe notre PREMIÈRE GROSSE COMMANDE"', description: 'Montrer le montant, le stress, l\'excitation', category: 'content', status: 'todo', priority: 'high', day: 18, assignee: 'chris', isVideo: true },
  
  // Jour 19
  { id: '55', title: 'Créer landing page waitlist', description: 'Page simple pour collecter emails', category: 'marketing', status: 'todo', priority: 'high', day: 19, assignee: 'chris' },
  { id: '56', title: '🎬 VIDÉO: "Chaga - le roi des antioxydants 🛡️"', description: 'Contenu éducatif: immunité, bienfaits', category: 'content', status: 'todo', priority: 'medium', day: 19, assignee: 'chris', isVideo: true },
  { id: '57', title: 'Configurer emails automatiques (Klaviyo)', description: 'Séquence welcome, rappels, conversion', category: 'marketing', status: 'todo', priority: 'medium', day: 19, assignee: 'chris' },
  
  // Jour 20
  { id: '58', title: '🎬 VIDÉO: "🚨 Inscrivez-vous à la WAITLIST"', description: 'Appel à l\'action, lien en bio', category: 'content', status: 'todo', priority: 'high', day: 20, assignee: 'chris', isVideo: true },
  { id: '59', title: 'Lancer la waitlist publiquement', description: 'Annoncer sur tous les réseaux', category: 'marketing', status: 'todo', priority: 'high', day: 20, assignee: 'chris' },
  { id: '60', title: 'Suivi commande poudres', description: 'Vérifier statut expédition', category: 'supplier', status: 'todo', priority: 'medium', day: 20, assignee: 'lucas' },
  
  // Jour 21 - Bilan S3
  { id: '61', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 3"', description: 'Stats waitlist, commandes passées, Shopify prêt', category: 'content', status: 'todo', priority: 'high', day: 21, assignee: 'chris', isVideo: true },
  { id: '62', title: 'Analyser inscrits waitlist', description: 'Combien d\'emails, taux conversion', category: 'marketing', status: 'todo', priority: 'medium', day: 21, assignee: 'chris' },
  { id: '63', title: 'Préparer mentions légales étiquettes', description: 'Conformité DGCCRF/SwissMedic', category: 'legal', status: 'todo', priority: 'high', day: 21, assignee: 'lucas' },

  // ========== SEMAINE 4 : CONTENU ÉDUCATIF & ATTENTE (J22-28) ==========
  
  // Jour 22
  { id: '64', title: '🎬 VIDÉO: "Ce que contient VRAIMENT notre produit"', description: 'Transparence totale sur les ingrédients', category: 'content', status: 'todo', priority: 'high', day: 22, assignee: 'chris', isVideo: true },
  { id: '65', title: 'Créer contenu éducatif batch (5 vidéos)', description: 'Préparer scripts vidéos champignons', category: 'content', status: 'todo', priority: 'medium', day: 22, assignee: 'chris' },
  { id: '66', title: 'Suivi commande packaging', description: 'Vérifier statut impression', category: 'supplier', status: 'todo', priority: 'medium', day: 22, assignee: 'lucas' },
  
  // Jour 23
  { id: '67', title: '🎬 VIDÉO: "Behind the scenes - notre bureau"', description: 'Tour du local, l\'équipe, l\'ambiance', category: 'content', status: 'todo', priority: 'medium', day: 23, assignee: 'chris', isVideo: true },
  { id: '68', title: '🎬 VIDÉO: "Pourquoi pêche-mangue?"', description: 'Expliquer le choix de saveur', category: 'content', status: 'todo', priority: 'medium', day: 23, assignee: 'chris', isVideo: true },
  { id: '69', title: 'Préparer espace production', description: 'Zone propre pour conditionner', category: 'admin', status: 'todo', priority: 'high', day: 23, assignee: 'lucas' },
  
  // Jour 24
  { id: '70', title: '🎬 VIDÉO: "La différence entre extraits et poudres"', description: 'Éducation: pourquoi on utilise des extraits', category: 'content', status: 'todo', priority: 'medium', day: 24, assignee: 'chris', isVideo: true },
  { id: '71', title: 'Réception poudres (estimé)', description: 'Vérifier qualité, stocker correctement', category: 'supplier', status: 'todo', priority: 'high', day: 24, assignee: 'lucas' },
  { id: '72', title: '🎬 VIDÉO: "📦 LES POUDRES SONT LÀ!"', description: 'Unboxing grosse commande', category: 'content', status: 'todo', priority: 'high', day: 24, assignee: 'chris', isVideo: true },
  
  // Jour 25
  { id: '73', title: 'Réception packaging (estimé)', description: 'Vérifier impression, qualité', category: 'supplier', status: 'todo', priority: 'high', day: 25, assignee: 'lucas' },
  { id: '74', title: '🎬 VIDÉO: "😍 Notre packaging est INCROYABLE"', description: 'Reveal design final, réaction', category: 'content', status: 'todo', priority: 'high', day: 25, assignee: 'chris', isVideo: true },
  { id: '75', title: 'Test production petit lot', description: 'Produire 20 sachets test', category: 'product', status: 'todo', priority: 'high', day: 25, assignee: 'both' },
  
  // Jour 26
  { id: '76', title: '🎬 VIDÉO: "On produit nos PREMIERS sachets!"', description: 'Filmer le process de production', category: 'content', status: 'todo', priority: 'high', day: 26, assignee: 'chris', isVideo: true },
  { id: '77', title: 'Contrôle qualité lot test', description: 'Vérifier poids, fermeture, aspect', category: 'product', status: 'todo', priority: 'high', day: 26, assignee: 'lucas' },
  { id: '78', title: 'Calculer temps production/sachet', description: 'Optimiser le process', category: 'admin', status: 'todo', priority: 'medium', day: 26, assignee: 'lucas' },
  
  // Jour 27
  { id: '79', title: '🎬 VIDÉO: "Combien ça coûte de lancer un produit?"', description: 'Breakdown transparent des coûts', category: 'content', status: 'todo', priority: 'high', day: 27, assignee: 'chris', isVideo: true },
  { id: '80', title: 'Test échantillons sur proches', description: 'Distribuer à 10 personnes pour feedback', category: 'product', status: 'todo', priority: 'high', day: 27, assignee: 'both' },
  { id: '81', title: 'Contacter Jessica (influenceuse) pour collab', description: 'Premier contact partenariat', category: 'marketing', status: 'todo', priority: 'medium', day: 27, assignee: 'chris' },
  
  // Jour 28 - Bilan S4
  { id: '82', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 4"', description: 'Produit prêt, premiers tests, retours', category: 'content', status: 'todo', priority: 'high', day: 28, assignee: 'chris', isVideo: true },
  { id: '83', title: 'Analyser feedback testeurs', description: 'Compiler les retours, ajuster si besoin', category: 'product', status: 'todo', priority: 'high', day: 28, assignee: 'lucas' },
  { id: '84', title: 'Finaliser prix de vente', description: 'Calculer marge, fixer prix final', category: 'admin', status: 'todo', priority: 'high', day: 28, assignee: 'both' },

  // ========== SEMAINE 5 : PRÉ-LANCEMENT (J29-35) ==========
  
  // Jour 29
  { id: '85', title: '🎬 VIDÉO: "🚨 Les pré-commandes ouvrent dans 3 jours"', description: 'Créer l\'urgence, teaser', category: 'content', status: 'todo', priority: 'high', day: 29, assignee: 'chris', isVideo: true },
  { id: '86', title: 'Configurer pré-commandes Shopify', description: 'App PreOrder, paiement différé', category: 'marketing', status: 'todo', priority: 'high', day: 29, assignee: 'chris' },
  { id: '87', title: 'Créer offre early bird -20%', description: 'Code promo premiers 50 clients', category: 'marketing', status: 'todo', priority: 'high', day: 29, assignee: 'chris' },
  
  // Jour 30
  { id: '88', title: '🎬 VIDÉO: "Premiers VRAIS avis de testeurs"', description: 'Réactions des 10 personnes qui ont testé', category: 'content', status: 'todo', priority: 'high', day: 30, assignee: 'chris', isVideo: true },
  { id: '89', title: 'Email waitlist: J-2 avant pré-co', description: 'Rappel + offre exclusive waitlist', category: 'marketing', status: 'todo', priority: 'high', day: 30, assignee: 'chris' },
  { id: '90', title: 'Shooting photo produit final', description: 'Photos avec vrais sachets', category: 'marketing', status: 'todo', priority: 'high', day: 30, assignee: 'chris' },
  
  // Jour 31
  { id: '91', title: '🎬 VIDÉO: "DEMAIN on lance les pré-commandes"', description: 'Countdown, excitation, rappel', category: 'content', status: 'todo', priority: 'high', day: 31, assignee: 'chris', isVideo: true },
  { id: '92', title: 'Tester tunnel de vente complet', description: 'Passer commande test, vérifier emails', category: 'admin', status: 'todo', priority: 'high', day: 31, assignee: 'chris' },
  { id: '93', title: 'Email waitlist: C\'est demain!', description: 'Dernier rappel avec lien', category: 'marketing', status: 'todo', priority: 'high', day: 31, assignee: 'chris' },
  
  // Jour 32 - LANCEMENT PRÉ-CO
  { id: '94', title: '🎬 VIDÉO: "🚀 LES PRÉ-COMMANDES SONT OUVERTES!"', description: 'Annonce officielle, lien en bio', category: 'content', status: 'todo', priority: 'high', day: 32, assignee: 'chris', isVideo: true },
  { id: '95', title: 'Ouvrir pré-commandes 10h00', description: 'Activer la page, surveiller', category: 'marketing', status: 'todo', priority: 'high', day: 32, assignee: 'chris' },
  { id: '96', title: '🎬 VIDÉO: "Premières commandes en LIVE"', description: 'Réaction en direct aux ventes', category: 'content', status: 'todo', priority: 'high', day: 32, assignee: 'chris', isVideo: true },
  { id: '97', title: 'Lancer production stock', description: 'Produire 200+ sachets', category: 'product', status: 'todo', priority: 'high', day: 32, assignee: 'lucas' },
  
  // Jour 33
  { id: '98', title: '🎬 VIDÉO: "X commandes en 24h - les vrais chiffres"', description: 'Transparence sur les résultats', category: 'content', status: 'todo', priority: 'high', day: 33, assignee: 'chris', isVideo: true },
  { id: '99', title: 'Continuer production', description: 'Atteindre stock objectif', category: 'product', status: 'todo', priority: 'high', day: 33, assignee: 'lucas' },
  { id: '100', title: 'Répondre aux questions clients', description: 'DMs, emails, commentaires', category: 'marketing', status: 'todo', priority: 'high', day: 33, assignee: 'chris' },
  
  // Jour 34
  { id: '101', title: '🎬 VIDÉO: "On produit en mode usine 🏭"', description: 'Montrer la production à grande échelle', category: 'content', status: 'todo', priority: 'high', day: 34, assignee: 'chris', isVideo: true },
  { id: '102', title: 'Négocier collab Jessica', description: 'Discuter termes du partenariat', category: 'marketing', status: 'todo', priority: 'medium', day: 34, assignee: 'chris' },
  { id: '103', title: 'Contrôle qualité production', description: 'Vérifier chaque lot produit', category: 'product', status: 'todo', priority: 'high', day: 34, assignee: 'lucas' },
  
  // Jour 35 - Bilan S5
  { id: '104', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 5"', description: 'Stats pré-co, production avancée', category: 'content', status: 'todo', priority: 'high', day: 35, assignee: 'chris', isVideo: true },
  { id: '105', title: 'Point production: % complété', description: 'Évaluer avancée vs commandes', category: 'admin', status: 'todo', priority: 'high', day: 35, assignee: 'lucas' },
  { id: '106', title: 'Préparer colis (étiquettes, cartons)', description: 'Acheter matériel expédition', category: 'admin', status: 'todo', priority: 'medium', day: 35, assignee: 'lucas' },

  // ========== SEMAINE 6 : PRODUCTION & CONTENU (J36-42) ==========
  
  // Jour 36
  { id: '107', title: '🎬 VIDÉO: "Une journée dans notre vie d\'entrepreneurs"', description: 'Vlog: production, contenu, vie perso', category: 'content', status: 'todo', priority: 'medium', day: 36, assignee: 'chris', isVideo: true },
  { id: '108', title: 'Finaliser production pré-commandes', description: 'Atteindre 100% du stock nécessaire', category: 'product', status: 'todo', priority: 'high', day: 36, assignee: 'lucas' },
  { id: '109', title: 'Envoyer échantillons à Jessica', description: 'Pack découverte pour influenceuse', category: 'marketing', status: 'todo', priority: 'high', day: 36, assignee: 'lucas' },
  
  // Jour 37
  { id: '110', title: '🎬 VIDÉO: "Les 3 erreurs qu\'on a faites"', description: 'Transparence sur nos galères', category: 'content', status: 'todo', priority: 'medium', day: 37, assignee: 'chris', isVideo: true },
  { id: '111', title: '🎬 VIDÉO: "Comment préparer un BON ice tea"', description: 'Tuto: température, dosage, astuces', category: 'content', status: 'todo', priority: 'medium', day: 37, assignee: 'chris', isVideo: true },
  { id: '112', title: 'Préparer colis pré-commandes', description: 'Emballer, étiqueter les premiers colis', category: 'admin', status: 'todo', priority: 'high', day: 37, assignee: 'both' },
  
  // Jour 38
  { id: '113', title: '🎬 VIDÉO: "📦 On prépare VOS commandes"', description: 'Montrer l\'emballage avec soin', category: 'content', status: 'todo', priority: 'high', day: 38, assignee: 'chris', isVideo: true },
  { id: '114', title: 'Continuer préparation colis', description: 'Objectif: 50% des colis prêts', category: 'admin', status: 'todo', priority: 'high', day: 38, assignee: 'both' },
  { id: '115', title: 'Ajouter petites attentions colis', description: 'Carte merci, stickers, échantillons', category: 'marketing', status: 'todo', priority: 'medium', day: 38, assignee: 'chris' },
  
  // Jour 39
  { id: '116', title: '🎬 VIDÉO: "Ce qu\'on met dans chaque colis 🎁"', description: 'Reveal des petites surprises', category: 'content', status: 'todo', priority: 'medium', day: 39, assignee: 'chris', isVideo: true },
  { id: '117', title: 'Tous les colis prêts', description: 'Finaliser préparation 100%', category: 'admin', status: 'todo', priority: 'high', day: 39, assignee: 'both' },
  { id: '118', title: 'Réserver créneau La Poste', description: 'Organiser dépôt en masse', category: 'admin', status: 'todo', priority: 'medium', day: 39, assignee: 'lucas' },
  
  // Jour 40
  { id: '119', title: '🎬 VIDÉO: "DEMAIN on expédie tout!"', description: 'Montrer les piles de colis', category: 'content', status: 'todo', priority: 'high', day: 40, assignee: 'chris', isVideo: true },
  { id: '120', title: 'Envoyer email "Expédition demain"', description: 'Prévenir les clients, créer excitation', category: 'marketing', status: 'todo', priority: 'high', day: 40, assignee: 'chris' },
  { id: '121', title: 'Dernière vérification colis', description: 'Check final avant expédition', category: 'admin', status: 'todo', priority: 'high', day: 40, assignee: 'lucas' },
  
  // Jour 41 - EXPÉDITION
  { id: '122', title: '🎬 VIDÉO: "📬 ON EXPÉDIE TOUT!"', description: 'Direction La Poste avec tous les colis', category: 'content', status: 'todo', priority: 'high', day: 41, assignee: 'chris', isVideo: true },
  { id: '123', title: 'Expédier toutes les pré-commandes', description: 'Dépôt à La Poste/Colissimo', category: 'admin', status: 'todo', priority: 'high', day: 41, assignee: 'both' },
  { id: '124', title: 'Envoyer emails tracking', description: 'Numéros de suivi à chaque client', category: 'marketing', status: 'todo', priority: 'high', day: 41, assignee: 'chris' },
  
  // Jour 42 - Bilan S6
  { id: '125', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 6"', description: 'Toutes les pré-co expédiées, stats', category: 'content', status: 'todo', priority: 'high', day: 42, assignee: 'chris', isVideo: true },
  { id: '126', title: 'Préparer lancement public', description: 'Configurer Shopify pour vente ouverte', category: 'marketing', status: 'todo', priority: 'high', day: 42, assignee: 'chris' },
  { id: '127', title: 'Commander nouveau stock si besoin', description: 'Anticiper réassort poudres', category: 'supplier', status: 'todo', priority: 'medium', day: 42, assignee: 'lucas' },

  // ========== SEMAINE 7 : LANCEMENT PUBLIC (J43-49) ==========
  
  // Jour 43
  { id: '128', title: '🎬 VIDÉO: "Premiers clients ont reçu leurs colis!"', description: 'Réactions, unboxing des clients', category: 'content', status: 'todo', priority: 'high', day: 43, assignee: 'chris', isVideo: true },
  { id: '129', title: 'Collecter premiers avis clients', description: 'Demander reviews, photos, vidéos', category: 'marketing', status: 'todo', priority: 'high', day: 43, assignee: 'chris' },
  { id: '130', title: 'Répondre aux questions post-livraison', description: 'Support client, satisfaction', category: 'marketing', status: 'todo', priority: 'high', day: 43, assignee: 'chris' },
  
  // Jour 44
  { id: '131', title: '🎬 VIDÉO: "Les VRAIS avis de nos clients ⭐"', description: 'Montrer les messages reçus', category: 'content', status: 'todo', priority: 'high', day: 44, assignee: 'chris', isVideo: true },
  { id: '132', title: 'Publier témoignages sur Shopify', description: 'Ajouter reviews sur les fiches produit', category: 'marketing', status: 'todo', priority: 'medium', day: 44, assignee: 'chris' },
  { id: '133', title: 'Vidéo Jessica publiée (estimé)', description: 'Follow-up collab influenceuse', category: 'marketing', status: 'todo', priority: 'high', day: 44, assignee: 'chris' },
  
  // Jour 45
  { id: '134', title: '🎬 VIDÉO: "🛒 La boutique est OUVERTE à tous!"', description: 'Annonce lancement public', category: 'content', status: 'todo', priority: 'high', day: 45, assignee: 'chris', isVideo: true },
  { id: '135', title: 'Ouvrir vente publique', description: 'Retirer mode pré-commande', category: 'marketing', status: 'todo', priority: 'high', day: 45, assignee: 'chris' },
  { id: '136', title: 'Email waitlist: C\'est ouvert!', description: 'Annoncer à toute la liste', category: 'marketing', status: 'todo', priority: 'high', day: 45, assignee: 'chris' },
  
  // Jour 46
  { id: '137', title: '🎬 VIDÉO: "Première journée de vente: X€"', description: 'Transparence sur les résultats', category: 'content', status: 'todo', priority: 'high', day: 46, assignee: 'chris', isVideo: true },
  { id: '138', title: 'Analyser ventes jour 1', description: 'Metrics, conversion, panier moyen', category: 'marketing', status: 'todo', priority: 'high', day: 46, assignee: 'chris' },
  { id: '139', title: 'Produire stock supplémentaire', description: 'Anticiper la demande', category: 'product', status: 'todo', priority: 'high', day: 46, assignee: 'lucas' },
  
  // Jour 47
  { id: '140', title: '🎬 VIDÉO: "On teste les TikTok Ads"', description: 'Lancement premières pubs', category: 'content', status: 'todo', priority: 'high', day: 47, assignee: 'chris', isVideo: true },
  { id: '141', title: 'Créer campagne TikTok Ads', description: 'Budget 50€/jour, ciblage test', category: 'marketing', status: 'todo', priority: 'high', day: 47, assignee: 'chris' },
  { id: '142', title: 'Créer 3 créas publicitaires', description: 'UGC style, témoignages, produit', category: 'content', status: 'todo', priority: 'high', day: 47, assignee: 'chris' },
  
  // Jour 48
  { id: '143', title: '🎬 VIDÉO: "24h de pubs: premiers résultats"', description: 'Analyser performances ads', category: 'content', status: 'todo', priority: 'high', day: 48, assignee: 'chris', isVideo: true },
  { id: '144', title: 'Optimiser campagnes ads', description: 'Ajuster ciblage, créas, budget', category: 'marketing', status: 'todo', priority: 'high', day: 48, assignee: 'chris' },
  { id: '145', title: 'Expédier nouvelles commandes', description: 'Process daily shipping', category: 'admin', status: 'todo', priority: 'high', day: 48, assignee: 'lucas' },
  
  // Jour 49 - Bilan S7
  { id: '146', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 7"', description: 'Lancement public, ads, stats complètes', category: 'content', status: 'todo', priority: 'high', day: 49, assignee: 'chris', isVideo: true },
  { id: '147', title: 'Point financier: CA, marge, ROAS', description: 'Analyser rentabilité', category: 'admin', status: 'todo', priority: 'high', day: 49, assignee: 'both' },
  { id: '148', title: 'Planifier réapprovisionnement', description: 'Commander poudres/packaging si besoin', category: 'supplier', status: 'todo', priority: 'high', day: 49, assignee: 'lucas' },

  // ========== SEMAINE 8 : SCALE & OPTIMISATION (J50-56) ==========
  
  // Jour 50
  { id: '149', title: '🎬 VIDÉO: "On scale les pubs (budget x2)"', description: 'Augmentation budget si ROAS positif', category: 'content', status: 'todo', priority: 'high', day: 50, assignee: 'chris', isVideo: true },
  { id: '150', title: 'Scaler campagnes performantes', description: 'Doubler budget sur meilleures créas', category: 'marketing', status: 'todo', priority: 'high', day: 50, assignee: 'chris' },
  { id: '151', title: 'Créer nouvelles créas publicitaires', description: '3 nouvelles variations', category: 'content', status: 'todo', priority: 'medium', day: 50, assignee: 'chris' },
  
  // Jour 51
  { id: '152', title: '🎬 VIDÉO: "Un client nous a écrit ça... 🥹"', description: 'Témoignage touchant, UGC', category: 'content', status: 'todo', priority: 'medium', day: 51, assignee: 'chris', isVideo: true },
  { id: '153', title: 'Mettre en place programme parrainage', description: 'Offre pour clients existants', category: 'marketing', status: 'todo', priority: 'medium', day: 51, assignee: 'chris' },
  { id: '154', title: 'Contacter 5 nouveaux influenceurs', description: 'Élargir réseau collab', category: 'marketing', status: 'todo', priority: 'medium', day: 51, assignee: 'chris' },
  
  // Jour 52
  { id: '155', title: '🎬 VIDÉO: "Notre routine avec Boost ton Mood"', description: 'Lifestyle content, usage quotidien', category: 'content', status: 'todo', priority: 'medium', day: 52, assignee: 'chris', isVideo: true },
  { id: '156', title: 'Analyser retention clients', description: 'Qui recommande? Pourquoi?', category: 'marketing', status: 'todo', priority: 'medium', day: 52, assignee: 'chris' },
  { id: '157', title: 'Production batch supplémentaire', description: 'Maintenir stock optimal', category: 'product', status: 'todo', priority: 'high', day: 52, assignee: 'lucas' },
  
  // Jour 53
  { id: '158', title: '🎬 VIDÉO: "On doit DÉJÀ recommander du stock!"', description: 'Problème de riche, gestion', category: 'content', status: 'todo', priority: 'high', day: 53, assignee: 'chris', isVideo: true },
  { id: '159', title: 'Commander réassort poudres', description: 'Nouvelle commande fournisseur', category: 'supplier', status: 'todo', priority: 'high', day: 53, assignee: 'lucas' },
  { id: '160', title: 'Commander réassort packaging', description: 'Nouvelle commande sachets', category: 'supplier', status: 'todo', priority: 'high', day: 53, assignee: 'lucas' },
  
  // Jour 54
  { id: '161', title: '🎬 VIDÉO: "Réponse aux questions les plus posées"', description: 'FAQ vidéo, lever les objections', category: 'content', status: 'todo', priority: 'medium', day: 54, assignee: 'chris', isVideo: true },
  { id: '162', title: 'Créer page FAQ complète', description: 'Ajouter sur Shopify', category: 'marketing', status: 'todo', priority: 'medium', day: 54, assignee: 'chris' },
  { id: '163', title: 'Optimiser tunnel de vente', description: 'A/B test checkout, upsells', category: 'marketing', status: 'todo', priority: 'medium', day: 54, assignee: 'chris' },
  
  // Jour 55
  { id: '164', title: '🎬 VIDÉO: "Le vrai coût de nos pubs (transparence)"', description: 'CPA, ROAS, budget total', category: 'content', status: 'todo', priority: 'high', day: 55, assignee: 'chris', isVideo: true },
  { id: '165', title: 'Point performance ads', description: 'Analyser toutes les campagnes', category: 'marketing', status: 'todo', priority: 'high', day: 55, assignee: 'chris' },
  { id: '166', title: 'Pause/kill créas non performantes', description: 'Optimiser budget', category: 'marketing', status: 'todo', priority: 'high', day: 55, assignee: 'chris' },
  
  // Jour 56 - Bilan S8
  { id: '167', title: '🎬 VIDÉO: "📊 BILAN SEMAINE 8"', description: 'Scale, chiffres, croissance', category: 'content', status: 'todo', priority: 'high', day: 56, assignee: 'chris', isVideo: true },
  { id: '168', title: 'Bilan financier complet', description: 'P&L, marge, ROI global', category: 'admin', status: 'todo', priority: 'high', day: 56, assignee: 'both' },
  { id: '169', title: 'Préparer présentation résultats', description: 'Slides pour vidéo finale', category: 'content', status: 'todo', priority: 'medium', day: 56, assignee: 'chris' },

  // ========== SEMAINE 9 : BILAN & SUITE (J57-60) ==========
  
  // Jour 57
  { id: '170', title: '🎬 VIDÉO: "Les VRAIS chiffres après 60 jours 💰"', description: 'CA total, marge, investissement, ROI', category: 'content', status: 'todo', priority: 'high', day: 57, assignee: 'chris', isVideo: true },
  { id: '171', title: 'Documenter tout le process', description: 'SOP pour reproduction/scale', category: 'admin', status: 'todo', priority: 'medium', day: 57, assignee: 'lucas' },
  { id: '172', title: 'Analyser top 10 apprentissages', description: 'Lister les leçons clés', category: 'admin', status: 'todo', priority: 'medium', day: 57, assignee: 'both' },
  
  // Jour 58
  { id: '173', title: '🎬 VIDÉO: "Ce qu\'on aurait fait différemment"', description: 'Erreurs, apprentissages, conseils', category: 'content', status: 'todo', priority: 'high', day: 58, assignee: 'chris', isVideo: true },
  { id: '174', title: 'Planifier phase 2 (3-6 mois)', description: 'Nouveaux produits, équipe, objectifs', category: 'admin', status: 'todo', priority: 'high', day: 58, assignee: 'both' },
  { id: '175', title: 'Explorer nouvelles saveurs', description: 'R&D pour produits suivants', category: 'product', status: 'todo', priority: 'medium', day: 58, assignee: 'lucas' },
  
  // Jour 59
  { id: '176', title: '🎬 VIDÉO: "La suite: nos objectifs pour 6 mois"', description: 'Teaser phase 2, scaling, équipe', category: 'content', status: 'todo', priority: 'high', day: 59, assignee: 'chris', isVideo: true },
  { id: '177', title: 'Créer roadmap phase 2', description: 'Plan détaillé 3-6 mois', category: 'admin', status: 'todo', priority: 'high', day: 59, assignee: 'both' },
  { id: '178', title: 'Préparer montage vidéo finale', description: 'Collecter tous les clips des 60 jours', category: 'content', status: 'todo', priority: 'high', day: 59, assignee: 'chris' },
  
  // Jour 60 - FINALE
  { id: '179', title: '🎬 VIDÉO FINALE: "60 JOURS POUR LANCER UN PRODUIT"', description: 'Récap complet, montage épique, tous les résultats', category: 'content', status: 'todo', priority: 'high', day: 60, assignee: 'chris', isVideo: true },
  { id: '180', title: '🎬 VIDÉO: "MERCI ❤️"', description: 'Message de remerciement à la communauté', category: 'content', status: 'todo', priority: 'high', day: 60, assignee: 'both', isVideo: true },
  { id: '181', title: 'Célébrer! 🎉', description: 'On a réussi le challenge!', category: 'admin', status: 'todo', priority: 'high', day: 60, assignee: 'both' },
]

// ============================================
// FOURNISSEURS RÉELS
// ============================================

export interface Supplier {
  id: string
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  product_type: string
  country: string
  notes: string | null
  status: 'pending' | 'contacted' | 'negotiating' | 'accepted' | 'rejected'
}

export const suppliers: Supplier[] = [
  // FOURNISSEURS POUDRES CHAMPIGNONS
  {
    id: 's1',
    name: 'Nammex (North American Medicinal Mushroom Extracts)',
    contact_name: null,
    email: 'info@nammex.com',
    phone: null,
    website: 'https://www.nammex.com',
    product_type: 'Poudres champignons (extraits)',
    country: 'Canada',
    notes: 'Leader mondial des extraits de champignons médicinaux. Certifié bio, COA disponibles. MOQ ~25kg',
    status: 'pending'
  },
  {
    id: 's2',
    name: 'Oriveda',
    contact_name: null,
    email: 'info@oriveda.com',
    phone: null,
    website: 'https://www.oriveda.com',
    product_type: 'Poudres champignons (extraits)',
    country: 'Pays-Bas',
    notes: 'Extraits haute qualité, tests laboratoire indépendants. B2B sur demande',
    status: 'pending'
  },
  {
    id: 's3',
    name: 'Mushroom Harvest',
    contact_name: null,
    email: 'wholesale@mushroomharvest.com',
    phone: null,
    website: 'https://www.mushroomharvest.com',
    product_type: 'Poudres champignons',
    country: 'USA',
    notes: 'Poudres bio, certifié USDA. Programme wholesale disponible',
    status: 'pending'
  },
  {
    id: 's4',
    name: 'Real Mushrooms',
    contact_name: null,
    email: 'wholesale@realmushrooms.com',
    phone: null,
    website: 'https://www.realmushrooms.com/wholesale',
    product_type: 'Poudres champignons (extraits)',
    country: 'Canada',
    notes: 'Extraits de haute qualité, programme marque blanche, MOQ flexible',
    status: 'pending'
  },
  {
    id: 's5',
    name: 'Naturex (Givaudan)',
    contact_name: null,
    email: 'naturex.info@givaudan.com',
    phone: null,
    website: 'https://www.naturex.com',
    product_type: 'Extraits végétaux & champignons',
    country: 'France',
    notes: 'Grand groupe, qualité pharmaceutique, MOQ élevé mais qualité top',
    status: 'pending'
  },
  {
    id: 's6',
    name: 'Xi\'an Saina Biological',
    contact_name: 'Lily Wang',
    email: 'sales@sainabio.com',
    phone: null,
    website: 'https://www.sainabio.com',
    product_type: 'Poudres champignons',
    country: 'Chine',
    notes: 'Fournisseur Alibaba vérifié, prix compétitifs, demander COA',
    status: 'pending'
  },
  
  // FOURNISSEURS PACKAGING
  {
    id: 's7',
    name: 'Smurfit Kappa',
    contact_name: null,
    email: 'contact.fr@smurfitkappa.com',
    phone: '+33 1 41 90 30 00',
    website: 'https://www.smurfitkappa.com/fr',
    product_type: 'Packaging (sachets, boîtes)',
    country: 'France',
    notes: 'Leader européen packaging, solutions éco-responsables, MOQ moyen',
    status: 'pending'
  },
  {
    id: 's8',
    name: 'Pocket Pack',
    contact_name: null,
    email: 'info@pocketpack.fr',
    phone: null,
    website: 'https://www.pocketpack.fr',
    product_type: 'Sachets stick individuels',
    country: 'France',
    notes: 'Spécialisé sachets individuels, impression personnalisée, petits MOQ',
    status: 'pending'
  },
  {
    id: 's9',
    name: 'Packlinq',
    contact_name: null,
    email: 'info@packlinq.com',
    phone: null,
    website: 'https://www.packlinq.com',
    product_type: 'Sachets doypack',
    country: 'Belgique',
    notes: 'Sachets doypack personnalisés, MOQ 500 pièces, livraison rapide',
    status: 'pending'
  },
  {
    id: 's10',
    name: 'Weber Packaging',
    contact_name: null,
    email: 'info@weberpackaging.com',
    phone: null,
    website: 'https://www.weberpackaging.com',
    product_type: 'Packaging alimentaire',
    country: 'Allemagne',
    notes: 'Qualité allemande, certifié alimentaire, MOQ variable',
    status: 'pending'
  },
  
  // FAÇONNIERS / CONDITIONNEURS
  {
    id: 's11',
    name: 'Agronutris',
    contact_name: null,
    email: 'contact@agronutris.com',
    phone: '+33 4 67 59 30 00',
    website: 'https://www.agronutris.com',
    product_type: 'Façonnier compléments alimentaires',
    country: 'France',
    notes: 'Façonnier français, mélange et conditionnement, certifié ISO',
    status: 'pending'
  },
  {
    id: 's12',
    name: 'Nutrilab',
    contact_name: null,
    email: 'contact@nutrilab.fr',
    phone: null,
    website: 'https://www.nutrilab.fr',
    product_type: 'Façonnier compléments alimentaires',
    country: 'France',
    notes: 'Spécialisé compléments, poudres et gélules, accompagnement formulation',
    status: 'pending'
  },
  {
    id: 's13',
    name: 'Nutraveris',
    contact_name: null,
    email: 'info@nutraveris.com',
    phone: null,
    website: 'https://www.nutraveris.com',
    product_type: 'Conseil réglementaire + façonnage',
    country: 'France',
    notes: 'Expertise réglementaire + réseau façonniers, bon pour débuter',
    status: 'pending'
  },
  
  // ARÔMES
  {
    id: 's14',
    name: 'Robertet',
    contact_name: null,
    email: 'contact@robertet.com',
    phone: null,
    website: 'https://www.robertet.com',
    product_type: 'Arômes naturels',
    country: 'France',
    notes: 'Leader français des arômes naturels, qualité premium',
    status: 'pending'
  },
  {
    id: 's15',
    name: 'Firmenich',
    contact_name: null,
    email: 'info@firmenich.com',
    phone: null,
    website: 'https://www.firmenich.com',
    product_type: 'Arômes alimentaires',
    country: 'Suisse',
    notes: 'Géant mondial, large gamme, MOQ élevé',
    status: 'pending'
  },
]
