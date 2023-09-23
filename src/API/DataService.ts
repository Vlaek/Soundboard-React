import axios from 'axios'

export default class DataService {
	static async getAll() {
		const response = await axios.get('https://64c9ec74b2980cec85c28b5f.mockapi.io/tracks')
		return response
	}
}
