// ============================================
// PLAN D'ACTION COMPLET - 60 JOURS
// ============================================

export interface Task {
  id: string
  title: string
  description: string | null
  category: 'product' | 'supplier' | 'content' | 'admin' | 'marketing' | 'legal'
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  day: number
}

export const tasks: Task[] = [
  // ========== SEMAINE 1 : LANCEMENT & DÉFINITION ==========
  // Jour 1
  { id: '1', title: 'Setup du bureau à Montreux', description: 'Installer le matériel vidéo, décorer, créer l\'espace de tournage', category: 'admin', status: 'todo', priority: 'high', day: 1 },
  { id: '2', title: 'Définir le concept des 4 poudres', description: 'Lion\'s Mane (focus), Cordyceps (énergie), Reishi (sommeil), Chaga (immunité)', category: 'product', status: 'todo', priority: 'high', day: 1 },
  { id: '3', title: 'Créer le compte TikTok @sporelife.challenge', description: 'Nom, bio, photo de profil, lier au TikTok Shop', category: 'content', status: 'todo', priority: 'high', day: 1 },
  { id: '4', title: 'Définir le positionnement prix', description: 'Analyser concurrence, fixer prix cible (15-25€ par sachet)', category: 'product', status: 'todo', priority: 'high', day: 1 },
  
  // Jour 2
  { id: '5', title: 'Rechercher 20 fournisseurs de poudres', description: 'Europe + Asie, extraits de champignons certifiés bio', category: 'supplier', status: 'todo', priority: 'high', day: 2 },
  { id: '6', title: 'Créer template email fournisseurs', description: 'Message type pour demande de devis et MOQ', category: 'supplier', status: 'todo', priority: 'medium', day: 2 },
  { id: '7', title: 'Définir les dosages par sachet', description: 'Recherche dosages efficaces pour chaque champignon', category: 'product', status: 'todo', priority: 'high', day: 2 },
  
  // Jour 3
  { id: '8', title: 'Contacter 10 premiers fournisseurs poudres', description: 'Envoyer emails avec demande devis + échantillons', category: 'supplier', status: 'todo', priority: 'high', day: 3 },
  { id: '9', title: 'Rechercher 10 fournisseurs packaging', description: 'Sachets doypack, sachets stick, pots', category: 'supplier', status: 'todo', priority: 'high', day: 3 },
  { id: '10', title: 'Créer brief design packaging', description: 'Moodboard, couleurs, style visuel de la marque', category: 'product', status: 'todo', priority: 'medium', day: 3 },
  
  // Jour 4
  { id: '11', title: 'Contacter 5 fournisseurs packaging', description: 'Demander devis sachets + personnalisation', category: 'supplier', status: 'todo', priority: 'high', day: 4 },
  { id: '12', title: 'Définir les saveurs/arômes', description: 'Chocolat, vanille, nature, fruits rouges - tester associations', category: 'product', status: 'todo', priority: 'medium', day: 4 },
  { id: '13', title: 'Rechercher fournisseurs arômes naturels', description: 'Arômes bio pour masquer goût des champignons', category: 'supplier', status: 'todo', priority: 'medium', day: 4 },
  
  // Jour 5
  { id: '14', title: 'Analyser premiers retours fournisseurs', description: 'Comparer prix, MOQ, délais, qualité', category: 'supplier', status: 'todo', priority: 'high', day: 5 },
  { id: '15', title: 'Créer tableau comparatif fournisseurs', description: 'Excel avec tous les critères de sélection', category: 'supplier', status: 'todo', priority: 'medium', day: 5 },
  { id: '16', title: 'Relancer fournisseurs sans réponse', description: 'Email de relance + appel téléphonique', category: 'supplier', status: 'todo', priority: 'medium', day: 5 },
  
  // Jour 6
  { id: '17', title: 'Définir format final produit', description: 'Sachets individuels stick 10g vs sachets doypack 200g', category: 'product', status: 'todo', priority: 'high', day: 6 },
  { id: '18', title: 'Calculer coût de revient estimé', description: 'Poudre + arôme + packaging + main d\'oeuvre', category: 'product', status: 'todo', priority: 'high', day: 6 },
  { id: '19', title: 'Rechercher réglementation compléments', description: 'Normes DGCCRF, étiquetage obligatoire', category: 'legal', status: 'todo', priority: 'high', day: 6 },
  
  // Jour 7 - Bilan semaine 1
  { id: '20', title: 'Bilan semaine 1 - Vidéo récap', description: 'Filmer récap de la semaine, stats, apprentissages', category: 'content', status: 'todo', priority: 'medium', day: 7 },
  { id: '21', title: 'Planifier semaine 2', description: 'Ajuster planning selon avancée', category: 'admin', status: 'todo', priority: 'medium', day: 7 },

  // ========== SEMAINE 2 : SÉLECTION FOURNISSEURS ==========
  // Jour 8
  { id: '22', title: 'Short-lister 3 fournisseurs poudres', description: 'Sélectionner les meilleurs rapport qualité/prix', category: 'supplier', status: 'todo', priority: 'high', day: 8 },
  { id: '23', title: 'Commander échantillons poudres', description: 'Tester qualité, goût, texture', category: 'supplier', status: 'todo', priority: 'high', day: 8 },
  { id: '24', title: 'Négocier prix avec fournisseurs', description: 'Demander remises volume, conditions paiement', category: 'supplier', status: 'todo', priority: 'medium', day: 8 },
  
  // Jour 9
  { id: '25', title: 'Short-lister 2 fournisseurs packaging', description: 'Sachets avec meilleur rapport qualité/prix', category: 'supplier', status: 'todo', priority: 'high', day: 9 },
  { id: '26', title: 'Commander échantillons packaging', description: 'Tester qualité, zip, impression', category: 'supplier', status: 'todo', priority: 'high', day: 9 },
  { id: '27', title: 'Créer maquettes étiquettes', description: 'Design V1 des étiquettes produit', category: 'product', status: 'todo', priority: 'medium', day: 9 },
  
  // Jour 10
  { id: '28', title: 'Rechercher conditionneur/façonnier', description: 'Entreprise qui mélange et conditionne les poudres', category: 'supplier', status: 'todo', priority: 'high', day: 10 },
  { id: '29', title: 'Contacter 5 façonniers', description: 'Demander devis conditionnement à façon', category: 'supplier', status: 'todo', priority: 'high', day: 10 },
  { id: '30', title: 'Définir recettes exactes', description: 'Proportions poudre + arôme + édulcorant', category: 'product', status: 'todo', priority: 'high', day: 10 },
  
  // Jour 11
  { id: '31', title: 'Analyser devis façonniers', description: 'Comparer prix au kilo, MOQ, délais', category: 'supplier', status: 'todo', priority: 'high', day: 11 },
  { id: '32', title: 'Visiter façonnier (si possible)', description: 'Filmer la visite pour le contenu', category: 'supplier', status: 'todo', priority: 'medium', day: 11 },
  { id: '33', title: 'Préparer contrat type fournisseur', description: 'Clauses qualité, délais, confidentialité', category: 'legal', status: 'todo', priority: 'medium', day: 11 },
  
  // Jour 12
  { id: '34', title: 'Réception échantillons poudres', description: 'Tester, noter, comparer les 3 fournisseurs', category: 'supplier', status: 'todo', priority: 'high', day: 12 },
  { id: '35', title: 'Test gustatif des poudres', description: 'Filmer dégustation pour le contenu', category: 'content', status: 'todo', priority: 'medium', day: 12 },
  { id: '36', title: 'Choisir fournisseur poudres final', description: 'Décision basée sur qualité/prix/délai', category: 'supplier', status: 'todo', priority: 'high', day: 12 },
  
  // Jour 13
  { id: '37', title: 'Réception échantillons packaging', description: 'Tester qualité sachets, zip, étanchéité', category: 'supplier', status: 'todo', priority: 'high', day: 13 },
  { id: '38', title: 'Choisir fournisseur packaging final', description: 'Décision basée sur qualité/prix/MOQ', category: 'supplier', status: 'todo', priority: 'high', day: 13 },
  { id: '39', title: 'Finaliser design étiquettes', description: 'Version finale avec mentions légales', category: 'product', status: 'todo', priority: 'high', day: 13 },
  
  // Jour 14 - Bilan semaine 2
  { id: '40', title: 'Bilan semaine 2 - Vidéo récap', description: 'Montrer échantillons, expliquer choix', category: 'content', status: 'todo', priority: 'medium', day: 14 },
  { id: '41', title: 'Valider budget production', description: 'Calculer coût total première commande', category: 'admin', status: 'todo', priority: 'high', day: 14 },

  // ========== SEMAINE 3 : COMMANDES & DESIGN ==========
  // Jour 15
  { id: '42', title: 'Passer commande poudres (lot test)', description: 'Commander 5-10kg de chaque champignon', category: 'supplier', status: 'todo', priority: 'high', day: 15 },
  { id: '43', title: 'Passer commande packaging', description: 'Commander 500-1000 sachets personnalisés', category: 'supplier', status: 'todo', priority: 'high', day: 15 },
  { id: '44', title: 'Créer page Shopify produits', description: 'Préparer fiches produits (masquées)', category: 'marketing', status: 'todo', priority: 'medium', day: 15 },
  
  // Jour 16
  { id: '45', title: 'Créer shooting photo produits', description: 'Photos mockup avec design packaging', category: 'marketing', status: 'todo', priority: 'medium', day: 16 },
  { id: '46', title: 'Rédiger descriptions produits', description: 'Textes marketing pour chaque référence', category: 'marketing', status: 'todo', priority: 'medium', day: 16 },
  { id: '47', title: 'Définir offre de lancement', description: 'Pack découverte, réductions early birds', category: 'marketing', status: 'todo', priority: 'high', day: 16 },
  
  // Jour 17
  { id: '48', title: 'Créer landing page précommande', description: 'Page pour collecter emails intéressés', category: 'marketing', status: 'todo', priority: 'high', day: 17 },
  { id: '49', title: 'Configurer système précommande', description: 'Stripe, formulaire, emails automatiques', category: 'admin', status: 'todo', priority: 'high', day: 17 },
  { id: '50', title: 'Créer séquence email précommande', description: '3-5 emails pour convertir les inscrits', category: 'marketing', status: 'todo', priority: 'medium', day: 17 },
  
  // Jour 18
  { id: '51', title: 'Lancer campagne précommande', description: 'Annoncer sur TikTok, activer landing page', category: 'marketing', status: 'todo', priority: 'high', day: 18 },
  { id: '52', title: 'Créer offre early bird -20%', description: 'Réduction pour les 100 premiers', category: 'marketing', status: 'todo', priority: 'high', day: 18 },
  { id: '53', title: 'Préparer FAQ produits', description: 'Répondre aux questions fréquentes', category: 'marketing', status: 'todo', priority: 'medium', day: 18 },
  
  // Jour 19
  { id: '54', title: 'Suivi commande poudres', description: 'Vérifier statut expédition', category: 'supplier', status: 'todo', priority: 'medium', day: 19 },
  { id: '55', title: 'Suivi commande packaging', description: 'Vérifier statut impression/expédition', category: 'supplier', status: 'todo', priority: 'medium', day: 19 },
  { id: '56', title: 'Analyser premiers résultats précommande', description: 'Nombre inscrits, taux conversion', category: 'marketing', status: 'todo', priority: 'high', day: 19 },
  
  // Jour 20
  { id: '57', title: 'Relancer campagne précommande', description: 'Nouveau contenu, urgence, témoignages', category: 'marketing', status: 'todo', priority: 'high', day: 20 },
  { id: '58', title: 'Créer contenu behind-the-scenes', description: 'Montrer coulisses production', category: 'content', status: 'todo', priority: 'medium', day: 20 },
  { id: '59', title: 'Préparer espace conditionnement', description: 'Zone propre pour emballer les produits', category: 'admin', status: 'todo', priority: 'medium', day: 20 },
  
  // Jour 21 - Bilan semaine 3
  { id: '60', title: 'Bilan semaine 3 - Vidéo récap', description: 'Stats précommandes, avancée commandes', category: 'content', status: 'todo', priority: 'medium', day: 21 },
  { id: '61', title: 'Objectif : 50 précommandes', description: 'Point sur objectif précommande', category: 'marketing', status: 'todo', priority: 'high', day: 21 },

  // ========== SEMAINE 4 : RÉCEPTION & TESTS ==========
  // Jour 22-24
  { id: '62', title: 'Réception poudres', description: 'Vérifier qualité, stocker correctement', category: 'supplier', status: 'todo', priority: 'high', day: 22 },
  { id: '63', title: 'Réception packaging', description: 'Vérifier impression, qualité sachets', category: 'supplier', status: 'todo', priority: 'high', day: 23 },
  { id: '64', title: 'Premier test mélange maison', description: 'Tester recette, ajuster dosages', category: 'product', status: 'todo', priority: 'high', day: 24 },
  
  // Jour 25-28
  { id: '65', title: 'Affiner recettes après tests', description: 'Ajuster goût, texture, solubilité', category: 'product', status: 'todo', priority: 'high', day: 25 },
  { id: '66', title: 'Test conditionnement manuel', description: 'Tester process d\'emballage', category: 'product', status: 'todo', priority: 'high', day: 26 },
  { id: '67', title: 'Calculer temps production/unité', description: 'Optimiser le process', category: 'admin', status: 'todo', priority: 'medium', day: 27 },
  { id: '68', title: 'Bilan semaine 4', description: 'Point produit, ajustements', category: 'content', status: 'todo', priority: 'medium', day: 28 },

  // ========== SEMAINE 5-6 : PRODUCTION ==========
  // Jour 29-35
  { id: '69', title: 'Lancer production lot 1', description: 'Produire premiers 100 sachets', category: 'product', status: 'todo', priority: 'high', day: 29 },
  { id: '70', title: 'Contrôle qualité lot 1', description: 'Vérifier poids, fermeture, aspect', category: 'product', status: 'todo', priority: 'high', day: 30 },
  { id: '71', title: 'Produire lots 2-3-4', description: 'Continuer production 4 références', category: 'product', status: 'todo', priority: 'high', day: 32 },
  { id: '72', title: 'Bilan semaine 5', description: 'Avancée production, stocks', category: 'content', status: 'todo', priority: 'medium', day: 35 },
  
  // Jour 36-42
  { id: '73', title: 'Finaliser production précommandes', description: 'Avoir stock pour toutes les précommandes', category: 'product', status: 'todo', priority: 'high', day: 38 },
  { id: '74', title: 'Préparer colis précommandes', description: 'Emballer, étiqueter, préparer envoi', category: 'admin', status: 'todo', priority: 'high', day: 40 },
  { id: '75', title: 'Bilan semaine 6', description: 'Production terminée, prêt à expédier', category: 'content', status: 'todo', priority: 'medium', day: 42 },

  // ========== SEMAINE 7-8 : LANCEMENT ==========
  // Jour 43-49
  { id: '76', title: 'Expédier précommandes', description: 'Envoyer tous les colis précommande', category: 'admin', status: 'todo', priority: 'high', day: 43 },
  { id: '77', title: 'Collecter premiers avis clients', description: 'Demander feedback, témoignages', category: 'marketing', status: 'todo', priority: 'high', day: 46 },
  { id: '78', title: 'Ouvrir vente publique', description: 'Activer boutique Shopify pour tous', category: 'marketing', status: 'todo', priority: 'high', day: 47 },
  { id: '79', title: 'Lancer campagne TikTok Ads', description: 'Publicités pour acquisition clients', category: 'marketing', status: 'todo', priority: 'high', day: 48 },
  { id: '80', title: 'Bilan semaine 7', description: 'Premières ventes, retours clients', category: 'content', status: 'todo', priority: 'medium', day: 49 },
  
  // Jour 50-56
  { id: '81', title: 'Optimiser campagnes ads', description: 'Analyser et améliorer performances', category: 'marketing', status: 'todo', priority: 'high', day: 50 },
  { id: '82', title: 'Relancer clients satisfaits', description: 'Demander avis, offrir parrainage', category: 'marketing', status: 'todo', priority: 'medium', day: 52 },
  { id: '83', title: 'Planifier réapprovisionnement', description: 'Commander nouvelles poudres si besoin', category: 'supplier', status: 'todo', priority: 'high', day: 54 },
  { id: '84', title: 'Bilan semaine 8', description: 'Stats ventes, croissance', category: 'content', status: 'todo', priority: 'medium', day: 56 },

  // ========== SEMAINE 9 : FINALISATION ==========
  // Jour 57-60
  { id: '85', title: 'Analyser résultats complets', description: 'CA, marge, coût acquisition, LTV', category: 'admin', status: 'todo', priority: 'high', day: 57 },
  { id: '86', title: 'Documenter process complet', description: 'SOP pour reproduction/scale', category: 'admin', status: 'todo', priority: 'medium', day: 58 },
  { id: '87', title: 'Planifier phase 2 (scale)', description: 'Objectifs 3-6 mois, nouveaux produits', category: 'admin', status: 'todo', priority: 'high', day: 59 },
  { id: '88', title: 'VIDÉO FINALE - Bilan 60 jours', description: 'Récap complet, résultats, apprentissages', category: 'content', status: 'todo', priority: 'high', day: 60 },
]

// ============================================
// IDÉES VIDÉOS - 2-3 PAR JOUR
// ============================================

export interface Video {
  id: string
  title: string
  description: string | null
  platform: 'tiktok' | 'instagram' | 'youtube'
  status: 'idea' | 'scripted' | 'filmed' | 'editing' | 'published'
  day: number
  type: 'main' | 'bonus'
}

export const videos: Video[] = [
  // JOUR 1
  { id: 'v1', title: '🚀 On lance un produit en 60 jours - JOUR 1', description: 'Intro du challenge : qui on est, le concept, les objectifs', platform: 'tiktok', status: 'idea', day: 1, type: 'main' },
  { id: 'v2', title: 'Voici notre bureau à Montreux 🏔️', description: 'Tour du local, setup, l\'ambiance de travail', platform: 'tiktok', status: 'idea', day: 1, type: 'bonus' },
  { id: 'v3', title: 'Pourquoi les poudres de champignons ?', description: 'Expliquer les bienfaits, le marché, notre vision', platform: 'tiktok', status: 'idea', day: 1, type: 'bonus' },
  
  // JOUR 2
  { id: 'v4', title: 'Comment trouver des fournisseurs ? - JOUR 2', description: 'Montrer la recherche, les critères, les sites utilisés', platform: 'tiktok', status: 'idea', day: 2, type: 'main' },
  { id: 'v5', title: 'Lion\'s Mane : le champignon qui boost le cerveau 🧠', description: 'Éducation sur les bienfaits du Lion\'s Mane', platform: 'tiktok', status: 'idea', day: 2, type: 'bonus' },
  
  // JOUR 3
  { id: 'v6', title: 'On contacte nos premiers fournisseurs - JOUR 3', description: 'Montrer les emails envoyés, les réponses attendues', platform: 'tiktok', status: 'idea', day: 3, type: 'main' },
  { id: 'v7', title: 'Cordyceps : l\'énergie naturelle des athlètes ⚡', description: 'Éducation sur les bienfaits du Cordyceps', platform: 'tiktok', status: 'idea', day: 3, type: 'bonus' },
  { id: 'v8', title: 'Le template email parfait pour contacter un fournisseur', description: 'Tips pour avoir des réponses', platform: 'tiktok', status: 'idea', day: 3, type: 'bonus' },
  
  // JOUR 4
  { id: 'v9', title: 'Packaging : sachets vs pots ? - JOUR 4', description: 'Comparer les options, avantages/inconvénients', platform: 'tiktok', status: 'idea', day: 4, type: 'main' },
  { id: 'v10', title: 'Reishi : le champignon du sommeil 😴', description: 'Éducation sur les bienfaits du Reishi', platform: 'tiktok', status: 'idea', day: 4, type: 'bonus' },
  
  // JOUR 5
  { id: 'v11', title: 'Premiers retours fournisseurs ! - JOUR 5', description: 'Analyser les devis reçus, les surprises', platform: 'tiktok', status: 'idea', day: 5, type: 'main' },
  { id: 'v12', title: 'Combien coûte vraiment un produit ?', description: 'Breakdown des coûts : matière, packaging, marge', platform: 'tiktok', status: 'idea', day: 5, type: 'bonus' },
  { id: 'v13', title: 'Chaga : l\'antioxydant le plus puissant 🛡️', description: 'Éducation sur les bienfaits du Chaga', platform: 'tiktok', status: 'idea', day: 5, type: 'bonus' },
  
  // JOUR 6
  { id: 'v14', title: 'La réglementation des compléments alimentaires - JOUR 6', description: 'Ce qu\'on peut dire ou pas, les obligations', platform: 'tiktok', status: 'idea', day: 6, type: 'main' },
  { id: 'v15', title: 'Notre erreur du jour...', description: 'Partager un problème rencontré et la solution', platform: 'tiktok', status: 'idea', day: 6, type: 'bonus' },
  
  // JOUR 7
  { id: 'v16', title: '📊 BILAN SEMAINE 1 - Ce qu\'on a appris', description: 'Récap semaine, stats, prochaines étapes', platform: 'tiktok', status: 'idea', day: 7, type: 'main' },
  { id: 'v17', title: 'Les 5 erreurs à éviter quand on lance un produit', description: 'Tips basés sur notre expérience', platform: 'tiktok', status: 'idea', day: 7, type: 'bonus' },
  
  // JOUR 8
  { id: 'v18', title: 'On choisit nos fournisseurs finaux - JOUR 8', description: 'Expliquer les critères de sélection', platform: 'tiktok', status: 'idea', day: 8, type: 'main' },
  { id: 'v19', title: 'Comment négocier avec un fournisseur ?', description: 'Tips de négociation prix/MOQ', platform: 'tiktok', status: 'idea', day: 8, type: 'bonus' },
  
  // JOUR 9-10
  { id: 'v20', title: 'On commande nos premiers échantillons ! - JOUR 9', description: 'Montrer la commande, l\'excitation', platform: 'tiktok', status: 'idea', day: 9, type: 'main' },
  { id: 'v21', title: 'C\'est quoi un façonnier ? - JOUR 10', description: 'Expliquer le rôle du conditionneur', platform: 'tiktok', status: 'idea', day: 10, type: 'main' },
  { id: 'v22', title: 'Notre recette secrète (presque)', description: 'Teaser sur les formulations', platform: 'tiktok', status: 'idea', day: 10, type: 'bonus' },
  
  // JOUR 11-12
  { id: 'v23', title: 'Visite chez notre façonnier 🏭 - JOUR 11', description: 'Filmer la visite, montrer les machines', platform: 'tiktok', status: 'idea', day: 11, type: 'main' },
  { id: 'v24', title: '📦 Les échantillons sont arrivés ! - JOUR 12', description: 'Unboxing, premières impressions', platform: 'tiktok', status: 'idea', day: 12, type: 'main' },
  { id: 'v25', title: 'On goûte les poudres pour la première fois 😬', description: 'Réaction honnête au goût', platform: 'tiktok', status: 'idea', day: 12, type: 'bonus' },
  
  // JOUR 13-14
  { id: 'v26', title: 'On teste le packaging - JOUR 13', description: 'Qualité sachets, impression, zip', platform: 'tiktok', status: 'idea', day: 13, type: 'main' },
  { id: 'v27', title: '📊 BILAN SEMAINE 2', description: 'Récap, fournisseurs validés, prochaine étape', platform: 'tiktok', status: 'idea', day: 14, type: 'main' },
  
  // JOUR 15-17
  { id: 'v28', title: '💰 On passe notre première GROSSE commande - JOUR 15', description: 'Montrer le montant, le stress', platform: 'tiktok', status: 'idea', day: 15, type: 'main' },
  { id: 'v29', title: 'Notre design packaging final 🎨', description: 'Reveal du design, expliquer les choix', platform: 'tiktok', status: 'idea', day: 16, type: 'main' },
  { id: 'v30', title: '🚨 On lance les PRÉCOMMANDES - JOUR 17', description: 'Annoncer l\'ouverture, montrer la page', platform: 'tiktok', status: 'idea', day: 17, type: 'main' },
  { id: 'v31', title: 'Pourquoi on fait des précommandes ?', description: 'Expliquer la stratégie, les avantages', platform: 'tiktok', status: 'idea', day: 17, type: 'bonus' },
  
  // JOUR 18-21
  { id: 'v32', title: '🎉 Premières précommandes ! - JOUR 18', description: 'Réaction aux premières ventes', platform: 'tiktok', status: 'idea', day: 18, type: 'main' },
  { id: 'v33', title: 'On a fait X€ en 24h de précommandes', description: 'Partager les résultats transparents', platform: 'tiktok', status: 'idea', day: 19, type: 'main' },
  { id: 'v34', title: '📊 BILAN SEMAINE 3 - Stats précommandes', description: 'Nombre de préco, objectifs, ajustements', platform: 'tiktok', status: 'idea', day: 21, type: 'main' },
  
  // JOUR 22-28
  { id: 'v35', title: '📦 Les poudres sont arrivées ! - JOUR 22', description: 'Réception commande, vérification qualité', platform: 'tiktok', status: 'idea', day: 22, type: 'main' },
  { id: 'v36', title: 'Le packaging est là 😍 - JOUR 23', description: 'Unboxing packaging personnalisé', platform: 'tiktok', status: 'idea', day: 23, type: 'main' },
  { id: 'v37', title: 'Premier mélange test ! 🧪 - JOUR 24', description: 'Filmer le process de mélange', platform: 'tiktok', status: 'idea', day: 24, type: 'main' },
  { id: 'v38', title: 'On ajuste la recette - JOUR 25', description: 'Montrer les itérations, les tests', platform: 'tiktok', status: 'idea', day: 25, type: 'main' },
  { id: 'v39', title: 'Notre setup de production maison', description: 'Tour du "mini labo"', platform: 'tiktok', status: 'idea', day: 26, type: 'bonus' },
  { id: 'v40', title: '📊 BILAN SEMAINE 4', description: 'Produit prêt, production lancée', platform: 'tiktok', status: 'idea', day: 28, type: 'main' },
  
  // JOUR 29-35
  { id: 'v41', title: '🏭 On lance la production ! - JOUR 29', description: 'Premier lot de 100 unités', platform: 'tiktok', status: 'idea', day: 29, type: 'main' },
  { id: 'v42', title: 'Contrôle qualité : on vérifie tout', description: 'Montrer le process de vérification', platform: 'tiktok', status: 'idea', day: 30, type: 'bonus' },
  { id: 'v43', title: 'On a produit 500 sachets ! 📊 BILAN SEMAINE 5', description: 'Avancée production, stats', platform: 'tiktok', status: 'idea', day: 35, type: 'main' },
  
  // JOUR 36-42
  { id: 'v44', title: 'Production terminée ! 🎉 - JOUR 40', description: 'Stock prêt pour les précommandes', platform: 'tiktok', status: 'idea', day: 40, type: 'main' },
  { id: 'v45', title: 'On prépare les colis précommandes 📦', description: 'Montrer l\'emballage, les petites attentions', platform: 'tiktok', status: 'idea', day: 41, type: 'bonus' },
  { id: 'v46', title: '📊 BILAN SEMAINE 6 - Prêts à expédier !', description: 'Tout est prêt, demain on envoie', platform: 'tiktok', status: 'idea', day: 42, type: 'main' },
  
  // JOUR 43-49
  { id: 'v47', title: '📬 On expédie les précommandes ! - JOUR 43', description: 'Direction La Poste avec tous les colis', platform: 'tiktok', status: 'idea', day: 43, type: 'main' },
  { id: 'v48', title: 'Premiers retours clients ! ⭐ - JOUR 46', description: 'Lire les messages, les avis', platform: 'tiktok', status: 'idea', day: 46, type: 'main' },
  { id: 'v49', title: '🛒 La boutique est OUVERTE ! - JOUR 47', description: 'Lancement officiel de la vente', platform: 'tiktok', status: 'idea', day: 47, type: 'main' },
  { id: 'v50', title: 'On lance nos premières pubs TikTok 📱 - JOUR 48', description: 'Montrer les créas, le budget', platform: 'tiktok', status: 'idea', day: 48, type: 'main' },
  { id: 'v51', title: '📊 BILAN SEMAINE 7 - Premières ventes !', description: 'Stats ventes, retours, apprentissages', platform: 'tiktok', status: 'idea', day: 49, type: 'main' },
  
  // JOUR 50-56
  { id: 'v52', title: 'Résultats des pubs : ça marche ? - JOUR 50', description: 'Analyse ROAS, CPA, ajustements', platform: 'tiktok', status: 'idea', day: 50, type: 'main' },
  { id: 'v53', title: 'Un client nous a envoyé ça... 🥹', description: 'Témoignage client touchant', platform: 'tiktok', status: 'idea', day: 52, type: 'bonus' },
  { id: 'v54', title: 'On doit déjà recommander du stock ! 📈', description: 'Problème de riche, gestion stock', platform: 'tiktok', status: 'idea', day: 54, type: 'main' },
  { id: 'v55', title: '📊 BILAN SEMAINE 8', description: 'Croissance, chiffres, scaling', platform: 'tiktok', status: 'idea', day: 56, type: 'main' },
  
  // JOUR 57-60
  { id: 'v56', title: 'Les vrais chiffres après 60 jours 💰 - JOUR 57', description: 'CA, marge, investissement, ROI', platform: 'tiktok', status: 'idea', day: 57, type: 'main' },
  { id: 'v57', title: 'Ce qu\'on aurait fait différemment', description: 'Erreurs, apprentissages, conseils', platform: 'tiktok', status: 'idea', day: 58, type: 'bonus' },
  { id: 'v58', title: 'La suite : nos objectifs pour les 6 prochains mois', description: 'Scaling, nouveaux produits, équipe', platform: 'tiktok', status: 'idea', day: 59, type: 'bonus' },
  { id: 'v59', title: '🎬 VIDÉO FINALE - 60 JOURS POUR LANCER UN PRODUIT', description: 'Récap complet, montage épique, résultats', platform: 'tiktok', status: 'idea', day: 60, type: 'main' },
  { id: 'v60', title: 'MERCI à tous ceux qui nous ont suivis ❤️', description: 'Message de remerciement, communauté', platform: 'tiktok', status: 'idea', day: 60, type: 'bonus' },
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
