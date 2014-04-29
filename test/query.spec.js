(function (root, factory) {
    "use strict";

    if (typeof exports === "object") {
        // NodeJS. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require("../js/stardog.js"), require("expect.js"));
    } else if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["stardog", "expect"], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.Stardog, root.expect);
    }
}(this, function (Stardog, expect) {
    "use strict";

    // -----------------------------------
    // Describes the query test methods
    // -----------------------------------

    describe ("Query a DB receiving a bind of results.", function() {
        var conn;

        this.timeout(0);

        beforeEach(function() {
            conn = new Stardog.Connection();
            conn.setEndpoint("http://localhost:5820/");
            conn.setCredentials("admin", "admin");
        });

        afterEach(function() {
            conn = null;
        });

        it ("A query result should not be empty", function(done) {
            conn.onlineDB({ database: "nodeDB", strategy: "NO_WAIT" }, function () {

                conn.query({ 
                    database: "nodeDB",
                    query: "select distinct ?s where { ?s ?p ?o }",
                    limit: 20, 
                    offset: 0 
                }, function (data) {
                    //console.log(data);

                    expect(data).not.to.be(null);
                    expect(data.results).not.to.be(undefined);
                    expect(data.results.bindings).not.to.be(undefined);
                    expect(data.results.bindings.length).to.be.above(0);
                    expect(data.results.bindings.length).to.be(3);
                    done();
                });
            });
        });

    });

    describe ("Query a DB with QL reasoning receiving a bind of results.", function() {
        var conn;

        this.timeout(0);

        beforeEach(function() {
            conn = new Stardog.Connection();
            conn.setEndpoint("http://localhost:5820/");
            conn.setCredentials("admin", "admin");
            conn.setReasoning("QL");
        });

        afterEach(function() {
            conn = null;
        });

        it ("A query to Vehicles must have result count to 3", function(done) {
            
            conn.query({ 
                database: "nodeDBReasoning", 
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :Vehicle }", 
                limit: 20, 
                offset: 0 
            },
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(3);
                done();
            });
        });

        it ("A query to Car must have result count to 3", function(done) {
            conn.query({ 
                database: "nodeDBReasoning", 
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :Car }", 
                limit: 20, 
                offset: 0 
            },
            function (data) {
                // console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(3);
                done();
            });
        });

        it ("A query to SportsCar must have result count to 3", function(done) {
            
            conn.query({ 
                database: "nodeDBReasoning", 
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :SportsCar }", 
                limit: 20, 
                offset: 0 
            },
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(1);
                done();
            });
        });
    });

    describe ("Query a DB with RL reasoning receiving a bind of results.", function() {
        var conn;

        this.timeout(0);

        beforeEach(function() {
            conn = new Stardog.Connection();
            conn.setEndpoint("http://localhost:5820/");
            conn.setCredentials("admin", "admin");
            conn.setReasoning("RL");
        });

        afterEach(function() {
            conn = null;
        });

        it ("A query to Vehicles must have result count to 3", function(done) {
            
            conn.query({ 
                database: "nodeDBReasoning",
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :Vehicle }", 
                limit: 20,
                offset: 0
            }, 
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(3);
                done();
            });
        });

        it ("A query to Car must have result count to 3", function(done) {
            
            conn.query({ 
                database: "nodeDBReasoning",
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :Car }",
                limit: 20,
                offset: 0
            }, 
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(3);
                done();
            });
        });

        it ("A query to SportsCar must have result count to 1", function(done) {
            
            conn.query({
                database: "nodeDBReasoning", 
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :SportsCar }",
                limit: 20,
                offset: 0
            }, 
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(1);
                done();
            });
        });

    });

    describe ("Query a DB with EL reasoning receiving a bind of results.", function() {
        var conn;

        this.timeout(0);

        beforeEach(function() {
            conn = new Stardog.Connection();
            conn.setEndpoint("http://localhost:5820/");
            conn.setCredentials("admin", "admin");
            conn.setReasoning("EL");
        });

        afterEach(function() {
            conn = null;
        });

        it ("A query to Vehicles must have result count to 3", function(done) {
            
            conn.query({
                database: "nodeDBReasoning", 
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :Vehicle }", 
                limit: 20,
                offset: 0
            }, 
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(3);
                done();
            });
        });

        it ("A query to Car must have result count to 3", function(done) {
            
            conn.query({
                database: "nodeDBReasoning", 
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :Car }",
                limit: 20,
                offset: 0
            }, 
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(3);
                done();
            });
        });

        it ("A query to SportsCar must have result count to 1", function(done) {
            
            conn.query({
                database: "nodeDBReasoning",
                query: "prefix : <http://example.org/vehicles/> select distinct ?s where { ?s a :SportsCar }",
                limit: 20,
                offset: 0
            }, 
            function (data) {
                //console.log(data);

                expect(data).not.to.be(null);
                expect(data.results).not.to.be(undefined);
                expect(data.results.bindings).not.to.be(undefined);
                expect(data.results.bindings.length).to.be.above(0);
                expect(data.results.bindings.length).to.be(1);
                done();
            });
        });

    });
}));