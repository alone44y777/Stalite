export default async function handler(req, res) {
    // URL se ID lena (jaise: ?id=25544)
    const id = req.query.id;

    // CORS headers taake frontend se access ho sake
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (!id) {
        return res.status(400).json({
            developer: "NexGen_Tech",
            status: "failed",
            message: "[!] ERROR: NORAD ID is missing. Example: ?id=25544"
        });
    }

    try {
        // Original TLE API ko request bhejna
        const response = await fetch(`https://tle.ivanstanojevic.me/api/tle/${id}`);
        
        if (!response.ok) {
            return res.status(404).json({
                developer: "NexGen_Tech",
                status: "failed",
                message: `Satellite data not found for ID: ${id}`
            });
        }
        
        const data = await response.json();
        
        // Tumhara custom NexGen Tech response format
        res.status(200).json({
            developer: "NexGen_Tech",
            brand: "NexGen Tech Zone",
            status: "success",
            satellite_data: {
                name: data.name,
                norad_id: data.satelliteId,
                tle_line_1: data.line1,
                tle_line_2: data.line2,
                last_updated: data.date
            }
        });
    } catch (error) {
        res.status(500).json({
            developer: "NexGen_Tech",
            status: "error",
            message: "Internal Server Error"
        });
    }
}
  
