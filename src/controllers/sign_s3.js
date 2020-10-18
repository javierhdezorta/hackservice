var aws = require('aws-sdk');

aws.config.update({
  region: "us-east-1" ,
  accessKeyId: "AKIAI2IY3BZLVOBOHE5Q" ,
  secretAccessKey: "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"
})

const S3_BUCKET = "uploadfilesbbva";

exports.sign_s3 = (req,res) => {
  const s3 = new aws.S3();  
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 50,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({success:true, data:{returnData}});
  });
}
