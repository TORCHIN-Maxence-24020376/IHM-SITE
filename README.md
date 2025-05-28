# Documentation JavaFX pour BUT2 Informatique

Ce dépôt contient un site de documentation pédagogique sur JavaFX destiné aux étudiants BUT2 informatique. Vous trouverez des explications et des exemples pratiques sur les différents aspects de JavaFX : conteneurs, contrôles, événements, FXML, CSS, propriétés et bindings.

## Contenu du site

- **Vue d'ensemble** : introduction à JavaFX, concepts de base
- **Conteneurs** : VBox, HBox, BorderPane, GridPane, FlowPane, TilePane, StackPane
- **Contrôles** : Label, TextField, Button, CheckBox, RadioButton, et gestion des événements
- **Propriétés et Bindings** : propriétés observables, bindings unidirectionnels et bidirectionnels
- **FXML** : séparation vue/contrôleur, injection de dépendances
- **CSS** : stylisation de composants JavaFX

## Configuration de l'environnement de développement

### Prérequis

- JDK 17 ou supérieur
- IntelliJ IDEA (Community ou Ultimate)
- Maven (intégré à IntelliJ)
- JavaFX SDK (ou via Maven)
- Scene Builder (optionnel mais recommandé)

### Installation de JavaFX dans IntelliJ

1. **Créer un nouveau projet Maven**
   - Ouvrez IntelliJ IDEA
   - Cliquez sur "New Project"
   - Sélectionnez "Maven"
   - Choisissez le JDK approprié (17+)
   - Spécifiez le nom du projet et l'emplacement

2. **Configurer le fichier pom.xml**
   - Ajoutez les dépendances JavaFX et le plugin JavaFX Maven

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>javafx-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <name>javafx-demo</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <junit.version>5.9.2</junit.version>
        <javafx.version>17.0.6</javafx.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.openjfx</groupId>
            <artifactId>javafx-controls</artifactId>
            <version>${javafx.version}</version>
        </dependency>
        <dependency>
            <groupId>org.openjfx</groupId>
            <artifactId>javafx-fxml</artifactId>
            <version>${javafx.version}</version>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.openjfx</groupId>
                <artifactId>javafx-maven-plugin</artifactId>
                <version>0.0.8</version>
                <executions>
                    <execution>
                        <!-- Configuration par défaut pour exécuter avec "mvn javafx:run" -->
                        <id>default-cli</id>
                        <configuration>
                            <mainClass>com.example.javafxdemo/com.example.javafxdemo.MainApplication</mainClass>
                            <launcher>app</launcher>
                            <jlinkZipName>app</jlinkZipName>
                            <jlinkImageName>app</jlinkImageName>
                            <noManPages>true</noManPages>
                            <stripDebug>true</stripDebug>
                            <noHeaderFiles>true</noHeaderFiles>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

3. **Créer le fichier module-info.java**
   - Créez un fichier `module-info.java` dans le répertoire `src/main/java`

```java
module com.example.javafxdemo {
    requires javafx.controls;
    requires javafx.fxml;

    opens com.example.javafxdemo to javafx.fxml;
    exports com.example.javafxdemo;
}
```

### Exécution des exemples

Vous pouvez exécuter les exemples de deux façons :

1. **Via IntelliJ IDEA**
   - Ouvrez la classe principale contenant la méthode `main`
   - Cliquez sur le bouton "Run" (triangle vert) à côté de la méthode main

2. **Via Maven**
   - Utilisez la commande : `mvn javafx:run`

3. **Via ligne de commande**
   - Compilez avec : `javac --module-path /chemin/vers/javafx-sdk/lib --add-modules javafx.controls,javafx.fxml Main.java`
   - Exécutez avec : `java --module-path /chemin/vers/javafx-sdk/lib --add-modules javafx.controls,javafx.fxml Main`

### Installation et configuration de Scene Builder

1. **Téléchargez Scene Builder**
   - Rendez-vous sur [la page de téléchargement de Scene Builder](https://gluonhq.com/products/scene-builder/)
   - Téléchargez la version correspondant à votre système d'exploitation

2. **Intégration à IntelliJ IDEA**
   - Ouvrez IntelliJ IDEA
   - Allez dans "File" > "Settings" (ou "IntelliJ IDEA" > "Preferences" sur macOS)
   - Naviguez vers "Languages & Frameworks" > "JavaFX"
   - Indiquez le chemin vers l'exécutable SceneBuilder
   - Cliquez sur "Apply" puis "OK"

3. **Utilisation avec les fichiers FXML**
   - Clic droit sur un fichier FXML dans IntelliJ
   - Sélectionnez "Open in SceneBuilder"

## Structure du projet

Les exemples de code sont organisés selon la structure Maven standard :

```
src/
├── main/
│   ├── java/
│   │   ├── module-info.java
│   │   └── com/
│   │       └── example/
│   │           └── javafxdemo/
│   │               ├── controllers/
│   │               │   └── ...
│   │               ├── models/
│   │               │   └── ...
│   │               └── MainApplication.java
│   └── resources/
│       ├── com/
│       │   └── example/
│       │       └── javafxdemo/
│       │           ├── fxml/
│       │           │   └── ...
│       │           ├── css/
│       │           │   └── ...
│       │           └── images/
│       │               └── ...
│       └── module-info.java
```

## Liens utiles

- [Documentation officielle JavaFX](https://openjfx.io/javadoc/17/)
- [Tutoriels JavaFX d'Oracle](https://docs.oracle.com/javase/8/javafx/get-started-tutorial/get_start_apps.htm)
- [JavaFX CSS Reference Guide](https://docs.oracle.com/javafx/2/api/javafx/scene/doc-files/cssref.html)
- [Scene Builder](https://gluonhq.com/products/scene-builder/)

## Licence

Ce projet est distribué sous licence MIT. 