var OptIn = new Modal({
	title: 'Welcome Comrade',
	color: '#be3a3a',
	content: '“The means of production being the collective work of humanity, the product should be the collective property of the race. Individual appropriation is neither just nor serviceable. All belongs to all. All things are for all men, since all men have need of them, since all men have worked in the measure of their strength to produce them, and since it is not possible to evaluate every one\'s part in the production of the world\'s wealth. All things are for all. Here is an immense stock of tools and implements; here are all those iron slaves which we call machines, which saw and plane, spin and weave for us, unmaking and remaking, working up raw matter to produce the marvels of our time. But nobody has the right to seize a single one of these machines and say, "This is mine; if you want to use it you must pay me a tax on each of your products," any more than the feudal lord of medieval times had the right to say to the peasant, "This hill, this meadow belong to me, and you must pay me a tax on every sheaf of corn you reap, on every rick you build." All is for all! If the man and the woman bear their fair share of work, they have a right to their fair share of all that is produced by all, and that share is enough to secure them well-being. No more of such vague formulas as "The Right to work," or "To each the whole result of his labour." What we proclaim is The Right to Well-Being: Well-Being for All!”  &mdash; Peter Kropotkin',
	maxWidth: 8000,
});

var button = document.querySelector('.btn');
button.addEventListener('click', function() {
	OptIn.open();
});
