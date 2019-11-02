# News Scraper 

## Full Stack website that scrapes headlines from LA Times

## Description

This full stack web site scrapes story headlines from the LA Times and allows for user comments to be added/removed to each story.  Headlines, summary, link and comments are stored in a mongo database.

## Test Cases

Functionality Cases

1. page load
   1. all database stories rendered on page
2. Get New Stories button click
    1. LA Times is scraped for newest stories which will appear to top
3. Comments button click under a story
   1. comment section opens
   2. click again - comment section closes
   3. click comment button then click comment button on different story
4. Add comments
   1. try to add a blank comment - modal should appear
   2. add a valid comment - it should appear in the comment list and input box should be cleared
   3. close comment section and reopen - comments should still be present
5. Delete comments
   1. delete a comment - it should disappear from list
6. Story link - click on one and it should open LA Times stories in seperate tab.
7. Page reload - all stories and comment previously existing should be available - scraping for new stories is not automatic

