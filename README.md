change-server plugin
=====================

Chrome plugin to change server host address in current url

During development and support of web projects its very common to open one url
in several versions of code. 
Basic case: open production link 

    `http://production.com/some-location?q=blabla`

on few test/dev servers:

    ```
    http://test_us.example.com/some-location?q=blabla 
    http://test_uk.example.com/some-location?q=blabla
    ```


This small plugin was written after dozens of similar changes to the url.



Install from play market

    https://chrome.google.com/webstore/detail/change-domain-extenstion/enmelchckbimfklnfadpdeflngeeabpg
    
    
Usage
-----
To use it simply add all your domain, alias pairs in plugin settings.

`domain` - production.com, without http

`alias` - myproduction


