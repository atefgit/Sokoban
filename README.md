Instructions
Niveau 1: 

Fonctions de Base
Déplacement du joueur :
Le joueur peut se déplacer dans les quatre directions : haut, bas, gauche, droite.
Les déplacements sont limités par les bords, que le joueur ne peut pas traverser.
Rocher :
Le monde contient un rocher que le joueur peut pousser dans une des quatre directions.
Un rocher ne peut être poussé que si la case suivante est libre (pas de bord, ni un autre rocher).
Trou :
Le monde contient un trou où le rocher doit être poussé.
Les trous sont bloquants tant qu’ils ne sont pas remplis (le joueur ne peut pas les traverser).
Lorsque le rocher tombe dans le trou, la partie se termine.

Niveau 2: 

Multiples rochers et trous
Le monde contient plusieurs rochers et autant de trous.
Lorsqu’un rocher tombe dans un trou, celui-ci se remplit et devient une surface praticable (le joueur et les autres rochers peuvent marcher dessus). Une indication visuelle est attendue.
Lorsque tous les trous sont remplis, la partie se termine.

Niveau 3: 

Des rangées de rochers
Pousser en cascade :
Les rochers doivent pouvoir se pousser les uns les autres, permettant de pousser des rangés entières de rochers.
Niveau 4: 

Levels
Gestion de levels :
Lorsque tous les trous sont remplis, regénère un nouveau niveau avec plus de rochers et plus de trous
 

 

Fonctionnalités Optionnelles (pour enrichir le projet)
Annulation du dernier mouvement (Undo) :
Permet au joueur d’annuler son dernier mouvement pour revenir en arrière.
Historique des mouvements pour permettre des annulations multiples. (Stack)
Tirer les rochers :
Permet au joueur de tirer les rochers en maintenant une touche spécifique (par exemple Shift)
Ajouter des obstacles :
Ajoute des obstacles au sein des niveaux restreignant les mouvements au sein de la grille.
Réfléchir à un algorithme pour positionner les murs de manière moins chaotique en clusters et loin des trous.
Du level design ? :
Utiliser un fichier JSON pour coder dans le niveau les emplacements des rochers, des trous et des obstacles ainsi que celle du point de départ du joueur.
Écrire la logique pour charger le fichier et générer la grille en respectant ces emplacements.
Sélection de niveau :
Modifier le fichier index.html pour ajouter une liste déroulante et un bouton "charger" permettant de choisir un niveau parmi d'autres, liés à des fichiers JSON sous jacents. 
Sauvegarde et chargement de la progression :
Possibilité de sauvegarder l’état actuel du niveau pour reprendre plus tard.
