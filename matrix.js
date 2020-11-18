class Matrix
{
	constructor(rows, cols)
	{
		this.rows = rows;
		this.cols = cols;
		this.data = [];

		for (let i = 0; i < this.rows; i++)
		{
			this.data.push([]);
			for (let j = 0; j < this.cols; j++)
			{
				this.data[i].push(0);
			}				
		}
	}

	static fromArray(arr)
	{
		let out = new Matrix(arr.length, 1);
		for (let i = 0; i < arr.length; i++)
		{
			out.data[i][0] = arr[i];
		}
		return out;
	}

	toArray()
	{
		let arr =[];
		for (let i = 0; i < this.rows; i++)
		{
			for (let j = 0; j < this.cols; j++)
			{
				arr.push(this.data[i][j]);
			}
		}
		return arr;
	}

	randomize()
	{
		for (let i = 0; i < this.rows; i++)
		{
			for (let j = 0; j < this.cols; j++)
			{
				this.data[i][j] = Math.random() * 2 - 1;
			}
		}
	}

	add(n)
	{
		if(n instanceof Matrix)
		{
			for (let i = 0; i < this.rows; i++)
			{
				for (let j = 0; j < this.cols; j++)
				{
					this.data[i][j] += n.data[i][j];
				}
			}
		}
		else
		{
			for (let i = 0; i < this.rows; i++)
			{
				for (let j = 0; j < this.cols; j++)
				{
					this.data[i][j] += n;
				}
			}
		}
	}

	static subtract(a, b)
	{
		let result = new Matrix(a.rows, a.cols);
		for (let i = 0; i < a.rows; i++)
		{
			for (let j = 0; j < a.cols; j++)
			{
				result.data[i][j] = a.data[i][j] - b.data[i][j];
			}
		}
		return result;
	}

	static transpose(m)
	{
		let res = new Matrix(m.cols, m.rows);
		for (let i = 0; i < m.rows; i++)
		{
			for (let j = 0; j < m.cols; j++)
			{
				res.data[j][i] = m.data[i][j];
			}
		}
		return res;
	}

	static mult(m1, m2)
	{
		if (m1.cols !== m2.rows)
		{
			console.log("cols and rows don't match");
			return undefined;
		}
		let res = new Matrix(m1.rows, m2.cols);
		for (let i = 0; i < res.rows; i++)
		{
			for(let j = 0; j < res.cols; j++)
			{
				for(let mrun = 0; mrun < m1.cols; mrun++)
				{
					res.data[i][j] += m1.data[i][mrun] * m2.data[mrun][j];
				}
			}
		}
		return res;
	}

	static elementMult (m1, m2)
	{
		let res = new Matrix(m1.rows, m1.cols);
		for (let i = 0; i < res.rows; i++)
		{
			for(let j = 0; j < res.cols; j++)
			{
				res.data[i][j] += m1.data[i][j] * m2.data[i][j];
			}
		}
		return res;
	}

	mult(n)
	{
		for (let i = 0; i < this.rows; i++)
		{
			for (let j = 0; j < this.cols; j++)
			{
				this.data[i][j] *= n;
			}
		}
	}

	map(fn)
	{
		for (let i = 0; i < this.rows; i++)
		{
			for (let j = 0; j < this.cols; j++)
			{
				this.data[i][j] = fn(this.data[i][j]);
			}
		}
	}

	static map(mx, fn)
	{
		let res = new Matrix(mx.rows, mx.cols);
		for (let i = 0; i < mx.rows; i++)
		{
			for (let j = 0; j < mx.cols; j++)
			{
				res.data[i][j] = fn(mx.data[i][j]);
			}
		}
		return res;
	}

	print()
	{
		console.table(this.data);
	}
}

module.exports = Matrix;