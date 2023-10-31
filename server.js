	import http from 'http';
	import data from './data.js';


	const requestListener = (req, res ) => {
		const method = req['method'];
		const url = req.url.split('/')[1];
		const params = req.url.split('/'[2]);

		res.setHeader('Content-Type', 'application/json' );
		
		if (method == 'GET' ) {
			switch (url) {
				case 'pengaduan' :
					const responseJSON = {
						message : 'data berhasil ditemukan',
						data: data,
					};
				res.end(JSON.stringify(responseJSON));
				break;
			}
		};
		// get end

		if (method == "POST") {
			let requestBody = '';
			req.on('data',(m) =>{
					requestBody += m ;
					console.log(requestBody);		
				});

			switch (url) {
				case 'pengaduan':
				req.on('end',()=>{
					requestBody = JSON.parse(requestBody);
					data.push(requestBody);
					const responseJSON = {
						message : 'data berhasil diinput',
						data : data,
					};
					return res.end(JSON.stringify(data));
				});
					break;
			}
		}
		// post end

		if (method == 'PUT') {
			let requestBody = '';
			req.on('data', (m) => {
				requestBody += m;
				console.log(requestBody);
			});	
			switch (url) {
				case 'pengaduan' :
					req.on('end', () =>{
						requestBody = JSON.parse(requestBody);

						const dataFind = data.filter((data) =>data.NIM === params );
						if (dataFind.length < 0 ) {
							res.statusCode = 404;
							return res.end(JSON.stringify({
								message : 'data tidak ditemukan',
							}));
						} 
						else {
							res.statusCode = 200;
							return res.end(JSON.stringify({
								message : 'data berhasil diperbarui',
							}));
						}
					});
					break;
			}
		}
		// put end
		if(method == 'DELETE') {
			switch (url) {
				case 'pengaduan' :
					const index = data.findIndex((data) =>{
						data.NIM == params ;
				});

				data.splice(index, 1);
				if (index == 'pengaduan'){
					res.statusCode = 404;
							return res.end(JSON.stringify({
								message : 'data tidak ',
					}));
				}
				else {
					res.statusCode = 200;
					return res.end(JSON.stringify({
						message : 'data berhasil dihapus',
					}));
					break;
				}
			}
		}
	};
	const app = http.createServer(requestListener);

	const port = 3000;
	app.listen(port, ()=>{
		console.log(`Server running on port ${port}`);
	});
