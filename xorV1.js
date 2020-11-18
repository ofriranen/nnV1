const NeuralNetwork = require('/Users/ofri/Desktop/JsStarted/nn/jsNnLib/nnV1/nnV1.js');
const options = [[0,0], [0,1], [1,0], [1,1]];
const answers = [0, 1, 1, 0]

let nn = new NeuralNetwork(2,100,1);

nn.feedforward([0,1]);


for (let i = 0; i < 10000; i++)
{
	index = parseInt(Math.random()*4);
	//console.time("t");
	nn.train(options[index], [answers[index]]);
	//console.timeEnd("t");
}

options.forEach((item, index) => 
{
	console.log(nn.feedforward(item).data[0]);

})
