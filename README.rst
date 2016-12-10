===============
Amigo Invisible
===============

.. image:: https://img.shields.io/pypi/l/sonarqube-api.svg :target: http://www.opensource.org/licenses/MIT
.. image:: https://img.shields.io/travis/kako-nawao/amigo-invisible.svg :target: https://travis-ci.org/kako-nawao/amigo-invisible
.. image:: https://img.shields.io/coveralls/kako-nawao/amigo-invisible.svg :target: https://coveralls.io/github/kako-nawao/amigo-invisible

An application that lets you determine to whom you need to give a gift.

Running
=======

To execute the service (in dev mode), you can use::

    npm start

The first time you do it you should add the option to reset and bootstrap the database::

    npm start reset-db

Unit testing
============

To run all unit tests::

    npm test

Contributing
============

The usual:

* Clone the repo
* Create a new branch
* Make your contribution
* Push your branch
* When it's ready, create a pull request

First timers
------------

If it's the first time you use git, here's a simple walkthrough:

Install git
~~~~~~~~~~~

Since that depends on the OS you use, you may need to find out on your own
how to do that. A few examples:

* Ubuntu: ``sudo apt-get install git``
* Arch: ``sudo pacman -Sy git``
* Windows: *bang two rocks together*

Configure git
~~~~~~~~~~~~~

Once it's installed, you need to set up the username and email to let git know
who's pulling/pushing to the repo::

    git config --global user.name "<your github username here>"
    git config --global user.email "<your github-linked email here>"

Clone the repo
~~~~~~~~~~~~~~

Go to wherever you store your dev projects and clone it::

    cd ~/dev/projects/
    git clone https://github.com/xmas-bunch/amigo-invisible.git

Or, if you've got SSH keys set up::

    git clone git@github.com:xmas-bunch/amigo-invisible.git

Create a new branch
~~~~~~~~~~~~~~~~~~~

Go into the project directory and create a new branch, named after the issue
your branch is addressing::

    cd amigo-invisible
    git checkout -b issue-3

You can find your feature's corresponding issue `here <https://github.com/xmas-bunch/amigo-invisible/issues/>`_.

Make your changes
~~~~~~~~~~~~~~~~~

Add new directories, files, modify others... whatever your contribution is.

Once you're done, check the changes::

    git status

Then *stage* them for the next commit::

    git add .

Now your status should be updated, showing that all the files you changes are
going to be committed::

    git status

Commit and push changes
~~~~~~~~~~~~~~~~~~~~~~~

Commit your changes with a good descriptive message::

    git commit -m "[3] Add react application"

Remember to include the *[number of issue]* tag. But if you forgot, you can change
the message using ``amend``::

    git commit --amend -m "[3] Add react application"

Now push your changes::

    git push

Didn't work? Since it's a new branch, you need to set the upstream branch
(only the first time)::

    git push -u origin issue-3

Your branch should be in `github now <https://github.com/xmas-bunch/amigo-invisible/branches/>`_.

Create pull request
~~~~~~~~~~~~~~~~~~~

Go to the project's branches list in github if you haven't already, and
click on *New pull request* in your branch (button is on the right).

Set the title, and descriptive message of what you introduce into the
repository (eg, *Include react.js application*) and click on *Create pull request*.

As soon as you're done, you'll probably see a Travis check result, saying whether
the application built succesfully with your changes.

Now you need to wait for `the tech lead <https://github.com/kako-nawao/>`_
to review your pull request. He'll try to be gentle. :)
