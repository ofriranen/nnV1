function sigmoid(x)
{
	return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y)
{
	//return sigmoid(x) * (1 - sigmoid(x));
	return y * (1 - y);
}

const Matrix = require('./matrix.js');

class NeuralNetwork
{
	constructor(input_nodes, hidden_nodes, output_nodes)
	{
		this.input_nodes = input_nodes;
		this.hidden_nodes = hidden_nodes;
		this.output_nodes = output_nodes;

		this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
		this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
		this.weights_ih.randomize();
		this.weights_ho.randomize();

		this.bias_h = new Matrix(this.hidden_nodes, 1);
		this.bias_o = new Matrix(this.output_nodes, 1);
		this.bias_h.randomize();
		this.bias_o.randomize();
		this.lr = 0.1;
	}

	feedforward(input_array)
	{
		// generating the hidden outputs
		if (input_array instanceof Array)
		{
			var inputs = Matrix.fromArray(input_array);
		}

		else if(input_array instanceof Matrix)
		{
			var inputs = input_array;
		}

		else
		{
			console.log('bad inputs, not an Array, not a Matrix')
		}

		let hidden = Matrix.mult(this.weights_ih, inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid);
		// generating the output's output (the final output)
		let output = Matrix.mult(this.weights_ho, hidden);
		output.add(this.bias_o);
		output.map(sigmoid);
		//will return a Matrix for sure
		return output;
	}

	train(inputs_arr, targets)
	{
		let inputs = Matrix.fromArray(inputs_arr);
		let hidden = Matrix.mult(this.weights_ih, inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid);
		// generating the output's output (the final output)
		let outputs = Matrix.mult(this.weights_ho, hidden);
		outputs.add(this.bias_o);
		outputs.map(sigmoid);

		//let outputs = this.feedforward(inputs);		try this after instead of above
		// arr to Matrix
		targets = Matrix.fromArray(targets);

		// output error calc
		let output_errors = Matrix.subtract(targets, outputs);

		//calc gradient
		let gradients = Matrix.map(outputs, dsigmoid);
		gradients = Matrix.elementMult(gradients, output_errors); //########
		gradients.mult(this.lr);

		// calc deltas
		let hidden_T = Matrix.transpose(hidden);
		let Dweight_ho = Matrix.mult(gradients, hidden_T);

		//adjust by the deltas
		this.weights_ho.add(Dweight_ho);
		this.bias_o.add(gradients);

		// hidden layer errors calculation ---- make a loop here
		let w_ho_t = Matrix.transpose(this.weights_ho);
		let hidden_errors = Matrix.mult(w_ho_t, output_errors);

		// calculate hidden gradient
		let hidden_gradient = Matrix.map(hidden, dsigmoid);
		hidden_gradient = Matrix.elementMult(hidden_gradient, hidden_errors); //######
		hidden_gradient.mult(this.lr);

		// calc input -> hidden deltas
		let inputs_T = Matrix.transpose(inputs);
		let Dweight_ih = Matrix.mult(hidden_gradient, inputs_T);
		
		//adjust by the deltas
		this.weights_ih.add(Dweight_ih);
		this.bias_h.add(hidden_gradient);
	}
}

module.exports = NeuralNetwork;