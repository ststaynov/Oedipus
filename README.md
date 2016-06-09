# Oedipus

A scroll animation displaying the exclusive beer brewing process of Oedipus. Made in cooperation with their visual designer it displays the essence of Oedipus beer brewing.
Main animation engine used -  GSAP, however, when possible css animations are used in order to achieve GPU accelaration.

To set up the enviroment:

    $ mkdir <projectdir>
    $ cd <projectdir>
    $ git clone https://github.com/ststaynov/Oedipus.git

    pyvenv venv
    $ . venv/bin/activate
    $ pip install -r requirements.txt



To deploy the changes you've made to beermuseum.fabriquehq.nl, make sure that the changes you wish to deploy are pushed to branch master and execute the following command:
fab deploy_stg

(before deploying changes you must have your public key added to the fabrique server)


