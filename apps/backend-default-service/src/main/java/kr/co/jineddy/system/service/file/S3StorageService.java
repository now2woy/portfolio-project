package kr.co.jineddy.system.service.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * S3 스토리지 Service
 */
@Slf4j
@Service("s3StorageService")
public class S3StorageService {
	/**
	 * S3 스토리지 버킷
	 */
	private final String bucket;
	/**
	 * S3 스토리지 클라이언트
	 */
	private final S3Client s3;
	/**
	 * 서명된 요청값을 만드는 객체
	 */
	private final S3Presigner presigner;
	
	/**
	 * Service 생성자
	 * @param endpoint
	 * @param region
	 * @param bucket
	 * @param accessKey
	 * @param secretKey
	 * @param pathStyle
	 */
	public S3StorageService(
			@Value("${S3_ENDPOINT}") String endpoint, @Value("${S3_REGION}") String region
			, @Value("${S3_BUCKET}") String bucket, @Value("${S3_ACCESS_KEY}") String accessKey
			, @Value("${S3_SECRET_KEY}") String secretKey, @Value("${S3_PATH_STYLE_ACCESS:true}") boolean pathStyle) {
		this.bucket = bucket;
		S3Configuration cfg = S3Configuration.builder().pathStyleAccessEnabled(pathStyle).build();
		
		this.s3 = S3Client.builder()
				.endpointOverride(URI.create(endpoint))
				.region(Region.of(region))
				.credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)))
				.serviceConfiguration(cfg)
				.build();
		
		this.presigner = S3Presigner.builder()
				.endpointOverride(URI.create(endpoint))
				.region(Region.of(region))
				.credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)))
				.serviceConfiguration(cfg)
				.build();
	}
	
	/**
	 * MultipartFile을 S3 스토리지에 업로드 한다.
	 * @param file
	 * @return
	 * @throws Exception
	 */
	public String upload(MultipartFile file, String ext) throws IOException {
		// 날짜별 경로 만들기
		LocalDate today = LocalDate.now();
		String datePath = today.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		
		// 버킷에 등록할 키 등록
		String key = datePath + "/" + UUID.randomUUID() + ext;
		
		// 버킷에 파일 PUT
		s3.putObject(PutObjectRequest.builder().bucket(bucket).key(key).build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
		
		return key;
	}
	
	/**
	 * S3 스토리지에 저장된 파일을 다운로드 하기 위한 URL을 생성한다.
	 * @param key
	 * @return
	 */
	public String generateDownloadUrl(String key, String fileNm) {
		// 키를 이용해 요청값 생성
		GetObjectRequest getReq = GetObjectRequest.builder()
				.bucket(bucket)
				.key(key)
				.responseContentDisposition("attachment; filename=\"" + fileNm + "\"")
				.build();
		
		// 10분간 유효한 서명된 요청값 생성
		GetObjectPresignRequest presign = GetObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(10))
				.getObjectRequest(getReq)
				.build();
		
		return presigner.presignGetObject(presign).url().toString();
	}
	
	/**
	 * 버킷에서 파일을 삭제한다.
	 * @param key
	 */
	public void delete(String key) {
		s3.deleteObject(DeleteObjectRequest.builder()
				.bucket(bucket)
				.key(key)
				.build());
	}

}
