/* https://github.com/awslabs/aws-sdk-rust/blob/main/examples/s3/src/bin/client.rs */

#![allow(clippy::result_large_err)]

pub mod manage_s3 {
    use std::path::Path;

    // snippet-start:[s3.rust.client-use]
    use aws_config::{
        meta::region::RegionProviderChain,
        profile::profile_file::{ProfileFileKind, ProfileFiles},
    };
    use aws_sdk_s3::Client;
    // snippet-end:[s3.rust.client-use]

    /// List My Buckets
    pub async fn init_s3() -> Result<Vec<String>, aws_sdk_s3::Error> {
        let profile_files = ProfileFiles::builder()
            .with_file(
                ProfileFileKind::Credentials,
                Path::join(home::home_dir().unwrap().as_path(), ".aws").join("credentials"),
            )
            .build();
        // snippet-start:[s3.rust.client-client]
        let region_provider = RegionProviderChain::default_provider().or_else("ap-northeast-2");
        // let config = aws_config::from_env().region(region_provider).load().await;
        let config = aws_config::from_env()
            .profile_files(profile_files)
            .region(region_provider)
            .load()
            .await;
        let client = Client::new(&config);
        // snippet-end:[s3.rust.client-client]

        let resp = client.list_buckets().send().await?;
        let buckets = resp.buckets().unwrap_or_default();
        let num_buckets = buckets.len();

        let mut names = Vec::new();
        for bucket in buckets {
            println!("{}", bucket.name().unwrap_or_default());
            names.push(bucket.name().unwrap_or_default().to_string());
        }

        println!();
        println!("Found {} uckets.", num_buckets);

        Ok(names)
    }
}
