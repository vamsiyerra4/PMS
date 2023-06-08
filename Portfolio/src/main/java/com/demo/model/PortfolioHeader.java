package com.demo.model;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.demo.enums.RebalancingFrequency;
@Entity
public class PortfolioHeader{
	
	@Id
	private String portfolioName;
	private String baseCurrency;
	private String benchMark;
	private String investmentTheme;
	private String fundManagerName;
	@Enumerated(EnumType.STRING)
	private RebalancingFrequency rebalancingFrequency;
	private double investmentValue;
	@OneToOne
	private Theme theme;

public Theme getTheme() {
		return theme;
	}
	public void setTheme(Theme theme) {
		this.theme = theme;
	}
public String getPortfolioName() {
	return portfolioName;
}
public void setPortfolioName(String portfolioName) {
	this.portfolioName = portfolioName;
}
public String getBaseCurrency() {
	return baseCurrency;
}
public void setBaseCurrency(String baseCurrency) {
	this.baseCurrency = baseCurrency;
}
public String getBenchMark() {
	return benchMark;
}
public void setBenchMark(String benchMark) {
	this.benchMark = benchMark;
}
public String getInvestmentTheme() {
	return investmentTheme;
}
public void setInvestmentTheme(String investmentTheme) {
	this.investmentTheme = investmentTheme;
}
public String getFundManagerName() {
	return fundManagerName;
}
public void setFundManagerName(String fundManagerName) {
	this.fundManagerName = fundManagerName;
}

public RebalancingFrequency getRebalancingFrequency() {
	return rebalancingFrequency;
}
public void setRebalancingFrequency(RebalancingFrequency rebalancingFrequency) {
	this.rebalancingFrequency = rebalancingFrequency;
}
public double getInvestmentValue() {
	return investmentValue;
}
public void setInvestmentValue(double investmentValue) {
	this.investmentValue = investmentValue;
}
}
