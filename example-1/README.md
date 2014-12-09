<p>New to Mydex? Struggling to get your head around how to access a personal data store? Don't panic. This page will help you understand the whole process.</p>
<h4>Step 1 - Enter your details in the form</h4>
<p>The five boxes in the form contain the five pieces of information needed to access a PDS. These are:</p>
<ul>
<li>UID - This is the number unique to the PDS that you are trying to access. You can find it by logging into a profile on the <a href="https://sbx.mydex.org/">sandbox server</a> and going to the "manage connections" section.</li>
<li>PDS Key - This is the encryption key needed to unlock the PDS. It can also be found in the "manage connections" section of a profile.</li>
<li>Connection Node - This is unique to the entity trying to connect to the PDS. A good example is the developer read-only connection (17305). Be aware that the connection must be authorised by the user (in the "manage connections" section) before it can be used.</li>
<li>API Key - This is the developer key that you receive when creating a Mydex account <a href="https://dev.mydex.org/user">here</a>.</li>
<li>Dataset - This is the dataset that you want to access. Some examples are provided in the dropdown. A full list can be found in the data schema <a href="https://dev.mydex.org/data-schema/datasets.html">here</a>.</li>
</ul>
<p>If you don't understand some of these fields or haven't made a Mydex account yet, you can auto-fill the form with examples by clicking the buttons above it.</p>
<h4>Step 2 - Click on the big blue "Get Data" button</h4>
<p>This is where the magic happens! An ajax request is sent to retrive the data and display it in a nice little table at the bottom of the page so you can look through it.</p>
<p>If you put in the wrong information, an error message is displayed with some help on how to modify your inputs. </p>
<h4>Step 3 - Test out the url or the ajax request</h4>
<p>Have a look at exactly what you are accessing by copying the url into your browser. This should take you to the JSON object that you get back from the ajax call.</p>
<p>If you're feeling super brave, then have a go at making the ajax call yourself in a js file. Simply copy the example ajax call and change the <em>handle response</em> bit to something like console.log(response) to begin exploring the data.</p>
<h4>Step 4 - Go forth and develop!</h4>
<p>Thats all there is to it! You now know how to access a Mydex personal data store. If you need more information on how to access a PDS have a look at the <a href="https://dev.mydex.org/connection-api/connection-api-details.html">Mydex Developer Documentation</a>.</p>
